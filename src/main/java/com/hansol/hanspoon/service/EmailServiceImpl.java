package com.hansol.hanspoon.service;

import com.hansol.hanspoon.dto.EmailResponseDto;
import com.hansol.hanspoon.dto.FindPwRequestDto;
import com.hansol.hanspoon.dto.FindPwResponseDto;
import com.hansol.hanspoon.entity.User;
import com.hansol.hanspoon.exception.HanspoonException;
import com.hansol.hanspoon.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.stereotype.Service;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.io.UnsupportedEncodingException;
import java.security.SecureRandom;
import java.util.Date;
import java.util.Properties;
import java.util.Random;

import static com.hansol.hanspoon.exception.HanspoonErrorCode.*;


@Service
public class EmailServiceImpl implements EmailService{

    @Value("${email.username}")
    private String username;

    @Value("${email.password}")
    private String password;

    @Autowired
    private UserRepository userRepository;

    public static final String ePw = createKey();
    @Override
    public EmailResponseDto sendEmail(String email){
        EmailResponseDto emailResponseDto = new EmailResponseDto();

        //증복된 이메일 존재하는지 확인
        userRepository.findByEmail(email)
                .ifPresent(
                        (user->{
                            throw new HanspoonException(DUPLICATED_EMAIL);
                        }));


        //메일 내용
        String recipient = email;
        String subject = "Hanspoon 회원가입 이메일 인증";
        String body = "";
        body+= "<div style='margin:100px;'>";
        body+= "<h2>안녕하세요 Hanspoon입니다. </h2>";
        body+= "<br>";
        body+= "<p>아래 코드를 회원가입 창으로 돌아가 입력해주세요<p>";
        body+= "<br>";
        body+= "<div align='center' style='border:1px solid black; font-family:verdana';>";
        body+= "<h3 style='color:blue;'>회원가입 인증 코드입니다.</h3>";
        body+= "<div style='font-size:130%'>";
        body+= "CODE : <strong>";
        body+= ePw+"</strong><div>";
        body+= "</div>";


        sendEmailtoUser(recipient, subject, body);

        emailResponseDto.setAuthCode(ePw);
        return emailResponseDto;


    }

    private void sendEmailtoUser(String recipient, String subject, String body) {
        //메일 관련 정보
        String host = "smtp.naver.com";
        int port=465;

        Properties props = System.getProperties();

        props.put("mail.smtp.host",host);
        props.put("mail.smtp.port",port);
        props.put("mail.smtp.auth","true");
        props.put("mail.smtp.ssl.enable","true");
        props.put("mail.smtp.ssl.trust",host);

        Session session = Session.getDefaultInstance(props, new Authenticator() {
            @Override
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(username,password);
            }
        });

        session.setDebug(true);

        Message mimeMessage = new MimeMessage(session);
        try {
            mimeMessage.setFrom(new InternetAddress("kte2461@naver.com","Hanspoon"));
            mimeMessage.setRecipient(Message.RecipientType.TO, new InternetAddress(recipient));
            mimeMessage.setSubject(subject);
            mimeMessage.setContent(body, "text/html;charset=euc-kr");
            Transport.send(mimeMessage);

        } catch (MessagingException e) {
            throw new HanspoonException(NO_EMAIL);

        } catch (UnsupportedEncodingException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public FindPwResponseDto findPW(FindPwRequestDto request) {
        User user = userRepository.findByEmail(request.getEmail()).orElseThrow(()->new HanspoonException(NO_USER_EMAIL));
        if(!user.getUser_name().equals(request.getUser_name())){
            throw new HanspoonException(NO_EMAIL_NAME);
        }

        String temp_password = getRamdomPassword(10);
        user.setPassword(temp_password);
        userRepository.save(user);

        //메일 내용
        String recipient = request.getEmail();
        String subject = "Hanspoon 임시 비밀번호";
        String body = "";
        body+= "<div style='margin:100px;'>";
        body+= "<h2>안녕하세요 Hanspoon입니다. </h2>";
        body+= "<br>";
        body+= "<p>"+request.getUser_name()+"님의 임시 비밀번호입니다. 비밀번호를 변경하여 사용하세요<p>";
        body+= "<br>";
        body+= "<div align='center' style='border:1px solid black; font-family:verdana';>";
        body+= "<h3 style='color:blue;'>임시 비밀번호</h3>";
        body+= "<div style='font-size:130%'>";
        body+= "CODE : <strong>";
        body+= temp_password+"</strong><div>";
        body+= "</div>";

        sendEmailtoUser(recipient, subject, body);
        FindPwResponseDto  findPwResponseDto = new FindPwResponseDto();
        findPwResponseDto.setEmail(request.getEmail());

        return findPwResponseDto;

    }


    public static String createKey() {
        StringBuffer key = new StringBuffer();
        Random rnd = new Random();

        for (int i = 0; i < 8; i++) { // 인증코드 8자리
            int index = rnd.nextInt(3); // 0~2 까지 랜덤

            switch (index) {
                case 0:
                    key.append((char) ((int) (rnd.nextInt(26)) + 97));
                    //  a~z  (ex. 1+97=98 => (char)98 = 'b')
                    break;
                case 1:
                    key.append((char) ((int) (rnd.nextInt(26)) + 65));
                    //  A~Z
                    break;
                case 2:
                    key.append((rnd.nextInt(10)));
                    // 0~9
                    break;
            }
        }

        return key.toString();
    }


    public static String getRamdomPassword(int len) {
        char[] charSet = new char[] { '0', '1', '2', '3', '4', '5', '6', '7',
                '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
                'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
                'U', 'V', 'W', 'X', 'Y', 'Z' };

        int idx = 0;
        StringBuffer sb = new StringBuffer();

        System.out.println("charSet.length :::: "+charSet.length);

        for (int i = 0; i < len; i++) {

            idx = (int) (charSet.length * Math.random()); // 36 * 생성된 난수를  Int로 추출 (소숫점제거)
            System.out.println("idx :::: "+idx);
            sb.append(charSet[idx]);
        }

        return sb.toString();
    }

}

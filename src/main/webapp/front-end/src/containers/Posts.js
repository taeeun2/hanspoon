import React from 'react';

function Posts(props) {
    return (
        <div className="section_step">
            <div className="icon_06" data-top-bottom="transform:translateY(-20px)"
                data-bottom-top="transform:translateY(20px)"></div>
            <div className="inner">
                <div className="title_box">
                    <h3 className="inner_title">
                        <div className="icon_07" data-top-bottom="transform:translateY(-20px)"
                            data-bottom-top="transform:translateY(20px)"></div>
                        <span className="blind">참여방법</span>
                    </h3>
                </div>
                <div className="step_list">
                    <div className="icon_08" data-top-bottom="transform:translateY(-60px)"
                        data-bottom-top="transform:translateY(30px)"></div>
                    <div className="step_item_01">
                        <span className="step">step. 1</span>
                        <strong className="step_title">참여하기 버튼을 눌러<br />챌린지를 시작하세요</strong>
                        <div className="img_box"></div>
                        <p className="info_text">로그인한 네이버 ID의 블로그로<br />주간일기 챌린지에 참여됩니다.</p>
                    </div>
                    <div className="step_item_02">
                        <span className="step">step. 2</span>
                        <strong className="step_title">챌린지 카테고리에<br />한 주에 한 번 일기를 쓰세요</strong>
                        <div className="img_box"></div>
                        <p className="info_text">자동으로 만들어진 <em>[블챌] 카테고리</em>에<br />주간일기를 작성해야 정상 참여로 인정됩니다.</p>
                    </div>
                    <div className="step_item_03">
                        <span className="step">step. 3</span>
                        <strong className="step_title">주간일기는 꼭<br />전체공개로 발행해 주세요</strong>
                        <div className="img_box"></div>
                        <p className="info_text">스마트에디터 ONE으로 작성하고<br /> <em>전체공개로</em> 발행해야 합니다.</p>
                    </div>
                    <div className="step_item_04">
                        <span className="step">step. 4</span>
                        <strong className="step_title">내 참여 현황에서 스탬프로<br />진행 상황을 확인하세요</strong>
                        <div className="img_box"></div>
                        <p className="info_text">주간일기로 발행한 내 글에서도<br />참여 현황을 확인할 수 있습니다.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Posts;
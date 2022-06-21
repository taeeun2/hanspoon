import React from 'react';
import { Col, Row } from "reactstrap";
import Blog from "components/Blog";

const Blogs = () => {

    const BlogData = [
        {
            category: "한식",
            date: "2022.06.15",
            title: "나랑 밥 먹을 사람?",
            place: "고씨네 카레",
            participantNum: "2",
            capacity: "4",
            host: "익명",
            spoon: "3"
        },
        {
            category: "한식",
            date: "2022.06.15",
            title: "나랑 밥 먹을 사람?",
            place: "고씨네 카레",
            participantNum: "2",
            capacity: "4",
            host: "익명",
            spoon: "3"
        },
        {
            category: "한식",
            date: "2022.06.15",
            title: "나랑 밥 먹을 사람?",
            place: "고씨네 카레",
            participantNum: "2",
            capacity: "4",
            host: "익명",
            spoon: "3"
        },
        {
            category: "한식",
            date: "2022.06.15",
            title: "나랑 밥 먹을 사람?",
            place: "고씨네 카레",
            participantNum: "2",
            capacity: "4",
            host: "익명",
            spoon: "3"
        },
    ];

    return (
        <>
            <Row>
                {BlogData.map((blg, index) => (
                <Col sm="6" lg="6" xl="3" key={index}>
                    <Blog
                        category={blg.category}
                        date={blg.date}
                        title={blg.title}
                        place={blg.place}
                        participantNum={blg.participantNum}
                        capacity={blg.capacity}
                        host={blg.host}
                        spoon={blg.spoon}
                    />
                </Col>
                ))}
            </Row>
        </>
    );
}

export default Blogs;
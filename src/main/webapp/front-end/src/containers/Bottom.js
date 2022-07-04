import React from 'react';

function Bottom(props) {
    return (
        <div className="bottom_area" style={{"display":'none'}}>
            <div className="download_box">
                <div className="inner">
                    <strong className="info_text font_sf_b">
                        어디에서나 편리하게 <br className="mo" />블로그를 사용하세요.
                    </strong>
                    <p className="info_sub_text">
                        가지고 있는 모든 디바이스에서 <br className="mo" />블로그와 함께 하세요.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Bottom;
import './SelectBackground.css'
import SlideShow from 'react-image-show';
import "semantic-ui-css/semantic.min.css";
import bg01 from './BackgroundImage/bg01.png';
// 위와 같은 형식으로 background 이미지 쭉 나열 //
// (예) import bg02 from './BackgroundImage/bg02.png'; //
// import 뒤의 변수(예: bg02)를 아래 'urlArray' 배열에도 추가 //

function SelectBackground() {
    const urlArray = [bg01, bg01, bg01, bg01, ]; // bg01, bg02, 이런 식 //

    return (
        <div className="container">
            {/* 헤더 */}
            <div className="header">
                <p>UE-WEB</p>
            </div>

            {/* 이미지 show */}
            <SlideShow
                images={urlArray}
                width="920px"
                imagesWidth="800px"
                imagesHeight="450px"
                imagesHeightMobile="56vw"
                thumbnailsWidth="920px"
                thumbnailsHeight="12vw"
                indicators thumbnails fixedImagesHeight
            />

            {/* 버튼 */}
            <div className="btn_next">
                <button
                    className="ui inverted button"
                    
                > NEXT >>
                </button>
            </div>
            
        </div>
    );
}

export default SelectBackground;
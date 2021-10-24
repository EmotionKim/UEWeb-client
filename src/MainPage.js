import React, { useEffect, useState } from "react";
import './MainPage.css'
import SlideShow from 'react-image-show';
import "semantic-ui-css/semantic.min.css";
import mergeImages from 'merge-images';
import bg01 from './BackgroundImage/bg01.png';
// *** BackgroundImage폴더에 이미지 저장 -> 위와 같은 형식으로 background 이미지 쭉 나열 *** //
// import 뒤의 변수(예: bg02)를 아래 'urlArray' 배열에도 추가 //
// (예) import bg02 from './BackgroundImage/bg02.png'; //
import human01 from './ObjectImage/human01.png';
// *** ObjectImage폴더에 이미지 저장 -> 위와 같은 형식으로 object 이미지 쭉 나열 *** //
// (예) import human02 from './ObjectImage/human02.png'; //
import bg01_result from './BackgroundImage/bg01_result.jpg'; 

function MainPage() {

    const urlArray = [bg01, bg01, bg01, bg01, ]; // 배경이미지 *** bg01, bg02, 이런 식 *** //

    const [bgState, setBgState] = useState(false); // false: 배경선택 페이지, true: 물체선택 페이지
    const [resultState, setResultState] = useState(false); // true: 결과 페이지
    const [loadingState, setLoadingState] = useState(false); // ture: 결과이미지 수신 기다리는 중
    const [bgSrc, setBgSrc] = useState(null); // 선택된 배경이미지 src
    const [objectSrc, setObjectSrc] = useState(null); // 선택된 물체이미지 src
    const [objectX, setObjectX] = useState(0); // 물체이미지 x좌표
    const [objectY, setObjectY] = useState(0); // 물체이미지 y좌표

    // next버튼 클릭
    const clickNext = () => {
        setBgSrc(document.getElementsByClassName('ss-active')[1].src);
        if(bgSrc!=null) setBgState(true);
        console.log(bgSrc);
    };

    // Object이미지 추가
    useEffect( () => {
        if(objectSrc!=null) {
            mergeImages([{ src: bgSrc, x: 0, y: 0 }, { src: objectSrc, x: objectX, y: objectY }])
            .then(b64 => document.querySelector('img').src = b64);
        }
    });

    // START //
    return (
        <div className="container">
            {/* 헤더 */}
            <div className="header">
                <p><i class="window maximize outline icon"></i>UE WEB</p>
            </div>

            {!bgState ? (
                // === PAGE1: 배경이미지 선택 === //
                <div className="bgContainer">
                    <SlideShow
                        images={urlArray}
                        width="920px"
                        imagesWidth="auto"
                        imagesHeight="450px"
                        imagesHeightMobile="56vw"
                        thumbnailsWidth="920px"
                        thumbnailsHeight="12vw"
                        indicators thumbnails fixedImagesHeight
                    />

                    <div className="btn_next">
                        <button
                            className="ui inverted button"
                            onClick={clickNext}
                        > NEXT >>
                        </button>
                    </div>
                </div>
            ) : ( !resultState ? (
                // === PAGE2: 물체이미지 선택 === //
                <div>
                    <div className="editContainer">
                        <img id="editedImage" src={bgSrc} width="auto" height="400px" />

                        <div>
                            <table className="editTable">
                                {/* POSITION */}
                                <tr>
                                    <th>
                                        POSITION
                                    </th>
                                    <td>
                                        <div class="ui icon buttons">
                                            <button class="ui button" onClick={() => setObjectX(objectX - 50)}> <i class="arrow left icon"></i> </button>
                                            <button class="ui button" onClick={() => setObjectX(objectX + 50)}> <i class="arrow right icon"></i> </button>
                                            <button class="ui button" onClick={() => setObjectY(objectY + 50)}> <i class="arrow down icon"></i> </button>
                                            <button class="ui button" onClick={() => setObjectY(objectY - 50)}> <i class="arrow up icon"></i> </button>
                                        </div>
                                    </td>
                                    <td></td>
                                {/* SIZE */}
                                    <th>
                                        SIZE
                                    </th>
                                    <td>
                                        <div class="ui buttons">
                                            <button class="ui button"><i class="zoom-in icon"></i></button>
                                            <button class="ui button"><i class="zoom-out icon"></i></button>
                                        </div>
                                    </td>
                                </tr>
                                {/*  */}
                                <tr>
                                    <td colspan='5'>
                                        <div class="ui buttons">
                                            <button class="ui button" onClick={() => {setObjectSrc(null); setObjectX(0); setObjectY(0); setBgSrc(bgSrc);}}>DELETE</button>
                                            <div class="or"></div>
                                            <button class="ui positive button">DONE</button>
                                        </div>
                                    </td>
                                </tr>

                            </table>
  
                            <div className="btn_next">
                                <button
                                    className="ui inverted button"
                                    onClick={() => setResultState(true)}
                                > CREATE IMAGE >>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="objectBar">
                        <div> <img src={human01} onClick={() => setObjectSrc(human01)} /> </div>
                        <div> <img src={human01} /> </div>
                        <div> <img src={human01} /> </div>
                        <div> <img src={human01} /> </div>
                        <div> <img src={human01} /> </div>
                        {/* *** object 이미지는 여기에 추가 ***  */}
                    </div>

                </div>
            ) : (
                // === PAGE3: 결과이미지 보여주기 === //
                <div className="resultContainer">
                    <img src={bg01} /> 
                    <img src={bg01_result} /> <br/>
                    <div class="ui buttons resultbtn">
                        <button class="ui button">RETRY</button>
                        <div class="or"></div>
                        <button class="ui positive button">SAVE</button>
                    </div>
                </div>
            ) )}
        </div>
    );
}

export default MainPage;
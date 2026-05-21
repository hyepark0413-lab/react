// **컴포넌트 분리**
//1. function 이름() + return() ->필수 기본구조
//2. return 안에 빈태그 또는 div
//3. 빈태그 or div 안에 컴포넌트 이름 맘대로 만들기
//4. 만든 각 컴포넌트 안에 원본 html의 해당 파트 복붙
//5. class -> 전부 className으로 바꾸기
//닫힘 태그 없는 태그들 끝에 / 꼭 입력 (input,img 등)
//맨 하단에 rendering 꼭 써주기


function Boe() {
  return (
    <div>
      <Hero />
      <ScrollHeader />
      <Philosophy />
      <Curated />
      <Brand />
      <Designer />
      <Material />
      <Inspire />
      <Showroom />
      <Footer />
    </div>
  );
}

function Hero() {
  return (
    <>
      <section className="hero">
        <div>
          <img src="img/main_hero.jpg" alt="배경이미지" />
        </div>

        <h1 className="title">BOE</h1>

        <header className="top_header">
          <nav className="top_left_nav">
            <ul>
              <li><a href="#">BRAND</a></li>
              <li><a href="#">DESIGNER</a></li>
              <li><a href="#">EXHIBITION</a></li>
            </ul>
          </nav>

          <h1>
            <a href="react_main.html">
              <img src="img/logo_gold.png" alt="로고" />
            </a>
          </h1>

          <nav className="top_right_nav">
            <ul>
              <li><a href="#">PRESS</a></li>
              <li><a href="#">CONTACT</a></li>

              <li>
                <a href="#">
                  <img src="img/icon_insta_white.png" alt="SNS 아이콘" />
                </a>
              </li>

              <li>
                <a href="#">
                  <img src="img/icon_search_white.png" alt="검색" />
                </a>

                <input
                  type="text"
                  className="search_input"
                  placeholder="search"
                />
              </li>
            </ul>
          </nav>
        </header>
      </section>
    </>
  );
}

function ScrollHeader() {
  return (
    <>
      <header className="scroll_header">
        <nav className="scroll_left_nav">
          <ul>
            <li><a href="#">BRAND</a></li>
            <li><a href="#">DESIGNER</a></li>
            <li><a href="#">EXHIBITION</a></li>
          </ul>
        </nav>

        <h1>
          <a href="react_main.html">
            <img src="img/logo_gold.png" alt="로고" />
          </a>
        </h1>

        <nav className="scroll_right_nav">
          <ul>
            <li><a href="#">PRESS</a></li>
            <li><a href="#">CONTACT</a></li>

            <li>
              <a href="#">
                <img src="img/icon_insta_black.png" alt="SNS 아이콘" />
              </a>
            </li>

            <li>
              <a href="#">
                <img src="img/icon_search_black.png" alt="검색" />
              </a>

              <input
                type="text"
                className="search_input"
                placeholder="search"
              />
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}

function Philosophy() {
  return (
    <>
      <section className="philosophy">
        <video autoPlay muted loop playsInline>
          <source
            src="video/philosophy_video.mp4"
            type="video/mp4"
          />
        </video>

        <div className="Ptxt_main">
          <h1>Philosophy</h1>
          <div className="Pdivider"></div>
          <p>A Quiet Point of View</p>
        </div>

        <div className="Ptxt_sub">
          <p>
            We collect forms, materials, and atmospheres that stay with a room.
            <br />
            Not just furniture, but the temperature of a room.
            <br />
            The room begins where objects learn to stay quiet.
          </p>
        </div>
      </section>
    </>
  );
}

function Curated() {
  return (
    <>
      <section className="curated_space">
        <ul className="autoflow_image">
          <li><a href="#"><img src="img/space_cur09.jpg" alt="이미지" /></a></li>
          <li><a href="#"><img src="img/space_cur01.jpg" alt="이미지" /></a></li>
          <li><a href="#"><img src="img/space_cur03.jpg" alt="이미지" /></a></li>
          <li><a href="#"><img src="img/space_cur12.jpg" alt="이미지" /></a></li>
          <li><a href="#"><img src="img/space_cur02.jpg" alt="이미지" /></a></li>
          <li><a href="#"><img src="img/space_cur04.jpg" alt="이미지" /></a></li>
          <li><a href="#"><img src="img/space_cur05.jpg" alt="이미지" /></a></li>
          <li><a href="#"><img src="img/space_cur06.jpg" alt="이미지" /></a></li>
          <li><a href="#"><img src="img/space_cur07.jpg" alt="이미지" /></a></li>
          <li><a href="#"><img src="img/space_cur08.jpg" alt="이미지" /></a></li>
          <li><a href="#"><img src="img/space_cur10.jpg" alt="이미지" /></a></li>
          <li><a href="#"><img src="img/space_cur11.jpg" alt="이미지" /></a></li>
        </ul>

        <div className="front_box">
          <div className="F_txt">
            <h2>Curated Spaces</h2>
            <div className="Fdivider"></div>

            <p>
              Forms, lighting, and objects quietly composed for the way you live.
              Each piece is selected to bring balance, texture, and a quiet sense
              of presence into the room.
            </p>
          </div>

          <a href="#" className="Cbtn">Sense the Atmosphere</a>
        </div>
      </section>
    </>
  );
}

function Brand() {
  return (
    <>
      <section className="brand">
        <div className="brand_left">
          <div className="image_track active" data-brand="lasvit">
            <div className="image_item">
              <img className="default" src="img/lasvit_main01.jpg" alt="이미지" />
              <img className="hover" src="img/lasvit_main01_hover.jpg" alt="이미지" />
            </div>
          </div>

          <div className="arrow">
            <a className="prev">
              <img src="img/icon_arrow_prev.png" alt="이전" />
            </a>

            <a className="next">
              <img src="img/icon_arrow_next.png" alt="다음" />
            </a>
          </div>
        </div>

        <ul className="button_area">
          <li className="brand_tab active" data-brand="lasvit">
            <p><span>01</span>Lasvit</p>
            <small>LIGHTS</small>
          </li>
        </ul>
      </section>
    </>
  );
}

function Designer() {
  return (
    <>
      <section className="designer">
        <h2>Designers</h2>

        <ul>
          <li>
            <div className="designer_card">
              <img src="img/designer01.jpg" alt="이미지" />
            </div>

            <div className="hoverbox">
              <h3>Sergio Bicego</h3>

              <p className="hover_txt1">Brand</p>

              <div className="Hdivider"></div>

              <p className="hover_txt2">Saba Italia</p>

              <a href="#" className="Hbtn">View the Piece</a>
            </div>
          </li>
        </ul>

        <input
          type="range"
          min="0"
          max="100"
          defaultValue="0"
          className="drag"
        />
      </section>
    </>
  );
}

function Material() {
  return (
    <>
      <section className="material">
        <h2>Material, Refined</h2>

        <div className="desalto_wrap">
          <h2>DESALTO</h2>

          <div className="desalto_grid">
            <div className="grid1">
              <img src="img/material_metal02.jpeg" alt="이미지" />
            </div>

            <p className="grid2">
              Where metal finds its purest voice.
            </p>

            <p className="grid3">
              Desalto's refined metal craftsmanship gives rise to the Clay Table.
            </p>

            <div className="grid4">
              <img src="img/material_metal01.jpg" alt="이미지" />
            </div>

            <div className="grid5">
              <img src="img/material_metal03.jpeg" alt="이미지" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Inspire() {
  return (
    <>
      <section className="inspire">
        <h2>Be Inspired</h2>

        <p>
          Discover complete interiors shaped by furniture, light, and material.
        </p>

        <ul>
          <li><img src="img/inspired01.jpg" alt="이미지" /></li>
          <li><img src="img/inspired02.jpg" alt="이미지" /></li>
          <li className="active"><img src="img/inspired03.jpeg" alt="이미지" /></li>
        </ul>
      </section>
    </>
  );
}

function Showroom() {
  return (
    <>
      <section className="showroom">
        <div className="showroom_image">
          <img src="img/showroom.png" alt="이미지" />
        </div>

        <h2>BOE_COLLECTION</h2>

        <div className="info">
          <h3>With BOE</h3>

          <address>강남구 논현동 95-16, BOE</address>

          <p>FREE VALET SERVICE</p>

          <p>TEL. 02 517 6326</p>

          <a href="#" className="Ibtn">CONTACT</a>
        </div>
      </section>
    </>
  );
}

function Footer() {
  return (
    <>
      <footer>
        <div>
          <h1>
            <img src="img/logo_white.png" alt="로고" />
          </h1>

          <ul>
            <li>COMPANY 주식회사 보에</li>
            <li>CEO 이신희</li>
            <li>사업자등록번호 767-86-01426</li>
            <li>통신판매신고 제2020-서울강남-02609호</li>
            <li>ADDRESS 서울시 강남구 논현동 95-15</li>

            <li>
              <span>이용약관</span>
              <span>개인정보처리방침</span>
              <span>ABOUT</span>
            </li>

            <li>
              Copyright ⓒ 2026 bo-e All rights reserved.
            </li>
          </ul>
        </div>
      </footer>
    </>
  );
}

// 렌더링
ReactDOM.render(
    <Boe/>,
    document.getElementById("root")
);
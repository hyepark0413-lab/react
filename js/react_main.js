document.addEventListener("DOMContentLoaded", function () {

  /* ================= 1. hero 벗어나면 scroll header 등장 ================= */
  const hero = document.querySelector(".hero");
  const scrollHeader = document.querySelector(".scroll_header");

  if (hero && scrollHeader) {
    scrollHeader.style.display = "flex";

    window.addEventListener("scroll", function () {
      const heroBottom = hero.offsetTop + hero.offsetHeight;

      if (window.scrollY > heroBottom - 80) {
        scrollHeader.classList.add("show");
      } else {
        scrollHeader.classList.remove("show");
      }
    });
  }


 /* ================= 2. hero에서 다음 섹션으로 고급스럽게 이동 ================= */
  const philosophy = document.querySelector(".philosophy");
  let heroScrollLock = false;

  if (hero && philosophy) {
    window.addEventListener("wheel", function (e) {
      const inHero = window.scrollY < hero.offsetHeight - 80;

      if (inHero && e.deltaY > 0 && !heroScrollLock) {
        e.preventDefault();
        heroScrollLock = true;

        philosophy.scrollIntoView({
          behavior: "smooth"
        });

        setTimeout(function () {
          heroScrollLock = false;
        }, 1100);
      }
    }, { passive: false });
  }


  /* ================= 3. 검색 아이콘 클릭 시 input 토글 ================= */
  const searchIcons = document.querySelectorAll('img[alt="검색"]');

  searchIcons.forEach(function (icon) {
    icon.parentElement.addEventListener("click", function (e) {
      e.preventDefault();

      const header = icon.closest("header");
      let input = header.querySelector(".search_input");

      input.classList.toggle("open");

      if (input.classList.contains("open")) {
        input.focus();
      }
    });
  });


 /* ================= Philosophy 등장 효과 ================= */
const philosophySection = document.querySelector(".philosophy");

if (philosophySection) {
  const phItems = philosophySection.querySelectorAll(
    ".Ptxt_main h1, .Pdivider, .Ptxt_main p, .Ptxt_sub"
  );

  phItems.forEach(function (item, index) {
    // 다른 reveal 코드와 충돌 방지
    item.classList.remove("reveal", "show", "left", "right");

    item.classList.add("ph_item");
    item.style.transitionDelay = index * 0.14 + "s";
  });

  function showPhilosophy() {
    const rect = philosophySection.getBoundingClientRect();

    if (rect.top < window.innerHeight * 0.75) {
      phItems.forEach(function (item) {
        item.classList.add("ph_show");
      });
    }
  }

  window.addEventListener("scroll", showPhilosophy);
  window.addEventListener("resize", showPhilosophy);
  showPhilosophy();
}


 /* ================= 5. Curated Space 무한 자동 흐름 + 드래그 ================= */
const autoTrack = document.querySelector(".autoflow_image");

if (autoTrack) {
  const originalItems = Array.from(autoTrack.children);

  // 원본 li를 한 번 더 복제해서 뒤에 붙임
  originalItems.forEach(function (item) {
    autoTrack.appendChild(item.cloneNode(true));
  });

  let autoX = 0;
  let autoSpeed = 0.35;
  let isDragging = false;
  let startX = 0;
  let startAutoX = 0;

  // 이미지가 마우스에 붙어서 끌려가는 기본 드래그 방지
  autoTrack.querySelectorAll("img, a").forEach(function (el) {
    el.draggable = false;

    el.addEventListener("dragstart", function (e) {
      e.preventDefault();
    });
  });

  autoTrack.style.width = "max-content";
  autoTrack.style.userSelect = "none";
  autoTrack.style.cursor = "grab";
  autoTrack.style.willChange = "transform";

  function getLoopWidth() {
    // 복제 전 원본 한 세트의 길이만큼만 계산
    return autoTrack.scrollWidth / 2;
  }

  function setAutoPosition() {
    const loopWidth = getLoopWidth();

    // 왼쪽으로 한 세트만큼 이동하면 다시 처음 위치로 연결
    if (autoX <= -loopWidth) {
      autoX += loopWidth;
    }

    // 드래그로 오른쪽으로 너무 밀었을 때도 자연스럽게 연결
    if (autoX > 0) {
      autoX -= loopWidth;
    }

    autoTrack.style.transform = `translateX(${autoX}px)`;
  }

  function autoFlow() {
    if (!isDragging) {
      autoX -= autoSpeed;
      setAutoPosition();
    }

    requestAnimationFrame(autoFlow);
  }

  autoFlow();

  autoTrack.addEventListener("pointerdown", function (e) {
    isDragging = true;
    startX = e.clientX;
    startAutoX = autoX;
    autoTrack.style.cursor = "grabbing";
    autoTrack.setPointerCapture(e.pointerId);
  });

  autoTrack.addEventListener("pointermove", function (e) {
    if (!isDragging) return;

    autoX = startAutoX + (e.clientX - startX);
    setAutoPosition();
  });

  autoTrack.addEventListener("pointerup", function () {
    isDragging = false;
    autoTrack.style.cursor = "grab";
  });

  autoTrack.addEventListener("pointercancel", function () {
    isDragging = false;
    autoTrack.style.cursor = "grab";
  });
}


 /* ================= Brand 영역 ================= */
const brandLeft = document.querySelector(".brand_left");
const tracks = document.querySelectorAll(".image_track");
const tabs = document.querySelectorAll(".brand_tab");
const prevBtn = document.querySelector(".brand .prev");
const nextBtn = document.querySelector(".brand .next");

let currentBrand = "lasvit";
const brandIndex = {};

if (brandLeft && tracks.length) {
  const fx = document.createElement("div");
  fx.className = "brand_fx";
  brandLeft.appendChild(fx);

  tracks.forEach(function (track) {
    const brand = track.dataset.brand;
    brandIndex[brand] = 0;
    track.style.transition = "transform 0.45s ease";

    // 처음에는 모든 Lasvit hover 이미지를 숨김
    if (brand === "lasvit") {
      track.querySelectorAll(".image_item").forEach(function (item) {
        const defaultImg = item.querySelector(".default");
        const hoverImg = item.querySelector(".hover");

        if (!defaultImg || !hoverImg) return;

        defaultImg.style.display = "block";
        hoverImg.style.display = "none";

        item.addEventListener("mouseenter", function () {
          defaultImg.style.display = "none";
          hoverImg.style.display = "block";
        });

        item.addEventListener("mouseleave", function () {
          defaultImg.style.display = "block";
          hoverImg.style.display = "none";
        });
      });
    }
  });

  function realBrand(name) {
    if (name === "living") return "desalto";
    return name;
  }

  function showBrand(brandName) {
    currentBrand = realBrand(brandName);

    tracks.forEach(function (track) {
      const isActive = track.dataset.brand === currentBrand;
      track.classList.toggle("active", isActive);

      if (isActive) {
        brandIndex[currentBrand] = 0;
        track.style.transform = "translateX(0)";
      }
    });

    tabs.forEach(function (tab) {
      tab.classList.toggle("active", realBrand(tab.dataset.brand) === currentBrand);
    });
  }

  function moveImage(direction) {
    const activeTrack = document.querySelector(`.image_track[data-brand="${currentBrand}"]`);
    if (!activeTrack) return;

    const total = activeTrack.children.length;

    brandIndex[currentBrand] += direction;

    if (brandIndex[currentBrand] < 0) {
      brandIndex[currentBrand] = total - 1;
    }

    if (brandIndex[currentBrand] >= total) {
      brandIndex[currentBrand] = 0;
    }

    activeTrack.style.transform = `translateX(-${brandIndex[currentBrand] * 100}%)`;
  }

  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      showBrand(tab.dataset.brand);
    });
  });

  if (prevBtn) {
    prevBtn.addEventListener("click", function (e) {
      e.preventDefault();
      moveImage(-1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", function (e) {
      e.preventDefault();
      moveImage(1);
    });
  }

  brandLeft.addEventListener("mousemove", function (e) {
    const rect = brandLeft.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    fx.style.setProperty("--x", x + "%");
    fx.style.setProperty("--y", y + "%");

    fx.className = "brand_fx on";

    if (currentBrand === "lasvit") fx.classList.add("lasvit");
    if (currentBrand === "glas") fx.classList.add("glas");
    if (currentBrand === "desalto") fx.classList.add("desalto");

    // OFYR는 첫 번째 이미지일 때만 효과
    if (currentBrand === "ofyr" && brandIndex.ofyr === 0) {
      fx.classList.add("ofyr");
    }
  });

  brandLeft.addEventListener("mouseleave", function () {
    fx.className = "brand_fx";
  });

  showBrand(currentBrand);
}


 /* ================= Designer range + 마우스휠 가로 슬라이드 ================= */
const designerSection = document.querySelector(".designer");
const designerSlider = document.querySelector(".designer ul");
const designerRange = document.querySelector(".designer .drag");

if (designerSection && designerSlider && designerRange) {
  let current = 0;

  function getMaxMove() {
    return Math.max(0, designerSlider.scrollWidth - designerSection.clientWidth);
  }

  function moveDesigner(next) {
    const max = getMaxMove();

    current = Math.min(Math.max(next, 0), max);

    designerSlider.style.transform = `translateX(${-current}px)`;
    designerRange.value = max > 0 ? (current / max) * 100 : 0;
  }

  designerSlider.addEventListener("wheel", function (e) {
    const max = getMaxMove();
    if (max <= 0) return;

    e.preventDefault();

    moveDesigner(current + e.deltaY);
  }, { passive: false });

  designerRange.addEventListener("input", function () {
    const max = getMaxMove();
    moveDesigner(max * (designerRange.value / 100));
  });

  designerSlider.querySelectorAll("img").forEach(function (img) {
    img.draggable = false;
  });

  window.addEventListener("resize", function () {
    moveDesigner(current);
  });
}
  
  /* ============================= material =========================== */
  /* ================= Material 등장 효과 ================= */
const materialItems = document.querySelectorAll(
  ".desalto_grid > *, .glas_grid > *"
);

materialItems.forEach(function (item, index) {
  item.classList.add("reveal");

  // 이미지와 텍스트가 전부 같은 방향에서 오지 않게 방향 분리
  if (index % 3 === 0) {
    item.classList.add("left");
  } else if (index % 3 === 1) {
    item.classList.add("right");
  }

  item.style.transitionDelay = (index % 4) * 0.1 + "s";
});

const materialObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, {
  threshold: 0.18
});

materialItems.forEach(function (item) {
  materialObserver.observe(item);
});


  /* ================= Be Inspired 무한 슬라이드 + 클릭 중앙 이동 ================= */
const inspire = document.querySelector(".inspire");
const inspireTrack = document.querySelector(".inspire ul");

if (inspire && inspireTrack) {
  const originalItems = Array.from(inspireTrack.children);
  const originalLength = originalItems.length;

  // 뒤에 한 세트 복제
  originalItems.forEach(function (item) {
    inspireTrack.appendChild(item.cloneNode(true));
  });

  // 앞에 한 세트 복제
  originalItems.slice().reverse().forEach(function (item) {
    inspireTrack.insertBefore(item.cloneNode(true), inspireTrack.firstChild);
  });

  let inspireItems = Array.from(inspireTrack.children);

  // 원래 active가 3번째였으니까, 앞에 복제된 한 세트 길이 + 2
  let currentIndex = originalLength + 2;
  let currentX = 0;

  let isDragging = false;
  let startX = 0;
  let startMoveX = 0;
  let downItem = null;

  inspireTrack.querySelectorAll("img").forEach(function (img) {
    img.draggable = false;
  });

  function setActive(index) {
    inspireItems.forEach(function (item) {
      item.classList.remove("active");
    });

    inspireItems[index].classList.add("active");
  }

  function moveToIndex(index, animate) {
    const target = inspireItems[index];
    if (!target) return;

    currentIndex = index;

    inspireTrack.style.transition = animate ? "transform 0.45s ease" : "none";

    const sectionCenter = inspire.clientWidth / 2;
    const itemCenter = target.offsetLeft + target.offsetWidth / 2;

    currentX = sectionCenter - itemCenter;
    inspireTrack.style.transform = `translateX(${currentX}px)`;

    setActive(currentIndex);
  }

  function findClosestIndex() {
    const centerPoint = inspire.clientWidth / 2 - currentX;
    let closestIndex = currentIndex;
    let closestDistance = Infinity;

    inspireItems.forEach(function (item, index) {
      const itemCenter = item.offsetLeft + item.offsetWidth / 2;
      const distance = Math.abs(centerPoint - itemCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    return closestIndex;
  }

  function resetLoop() {
    if (currentIndex < originalLength) {
      currentIndex += originalLength;
      moveToIndex(currentIndex, false);
    }

    if (currentIndex >= originalLength * 2) {
      currentIndex -= originalLength;
      moveToIndex(currentIndex, false);
    }
  }

  inspireTrack.addEventListener("pointerdown", function (e) {
    isDragging = true;
    startX = e.clientX;
    startMoveX = currentX;
    downItem = e.target.closest("li");

    inspireTrack.classList.add("dragging");
    inspireTrack.style.transition = "none";
    inspireTrack.setPointerCapture(e.pointerId);
  });

  inspireTrack.addEventListener("pointermove", function (e) {
    if (!isDragging) return;

    currentX = startMoveX + (e.clientX - startX);
    inspireTrack.style.transform = `translateX(${currentX}px)`;
  });

 inspireTrack.addEventListener("pointerup", function (e) {
  if (!isDragging) return;

  isDragging = false;
  inspireTrack.classList.remove("dragging");

  const moveDistance = Math.abs(e.clientX - startX);
  const upItem = document.elementFromPoint(e.clientX, e.clientY).closest("li");

  // 거의 안 움직였으면 클릭으로 판단해서 그 이미지를 가운데로 이동
  if (moveDistance < 6 && downItem && downItem === upItem) {
    const clickedIndex = inspireItems.indexOf(upItem);
    moveToIndex(clickedIndex, true);
    return;
  }

  // 드래그였으면 가장 가까운 이미지를 가운데로 정렬
  moveToIndex(findClosestIndex(), true);
});

  inspireTrack.addEventListener("transitionend", function () {
    resetLoop();
  });

  window.addEventListener("load", function () {
    moveToIndex(currentIndex, false);
  });

  window.addEventListener("resize", function () {
    moveToIndex(currentIndex, false);
  });

  moveToIndex(currentIndex, false);
}
});
class CustomSwiper extends HTMLElement {
  connectedCallback() {
    const slidesHTML = this.querySelector('[data-slides]')?.innerHTML || '';
    const arrowsHTML = this.querySelector('[data-arrows]')?.innerHTML || '';
    const paginationType = this.getAttribute('pagination-type') || 'bullets';
    const showMobilePagination = this.getAttribute('mobile-pagination') || true;
    const spaceBetween = this.getAttribute('space-between') || 10;
    const slidesDesktop = parseInt(this.getAttribute('slides-desktop')) || 2;
    const slidesTablet = parseInt(this.getAttribute('slides-tablet')) || 2;
    const slidesMobile = parseInt(this.getAttribute('slides-mobile')) || 1;

    const hasPagination = paginationType && paginationType !== 'none';
    const paginationHTML = hasPagination
      ? `<div class="swiper-pagination ${showMobilePagination !== 'true' ? 'mobile:hidden' : ''}"></div>`
      : '';

    this.innerHTML = `
      <div class="swiper mySwiper">
        <div class="swiper-wrapper">
          ${slidesHTML}
        </div>
        ${arrowsHTML}
        ${paginationHTML}
      </div>
    `;

    const args = {
      navigation: {
        nextEl: '.swiper-button--next',
        prevEl: '.swiper-button--previous',
      },
      slidesPerView: slidesMobile, // default mobile
      spaceBetween: spaceBetween,
      breakpoints: {
        640: { slidesPerView: slidesMobile },
        768: { slidesPerView: slidesTablet },
        1024: { slidesPerView: slidesDesktop },
      },
      observer: true,
    observeParents: true,
    observeSlideChildren: true,
    };

    if (hasPagination) {
      args.pagination = {
        el: '.swiper-pagination',
        type: paginationType,
        clickable: true,
      };
    }

    new Swiper(this.querySelector('.mySwiper'), args);
  }
}

customElements.define('custom-swiper', CustomSwiper);
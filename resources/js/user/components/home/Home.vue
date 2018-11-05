<template>
    <div>
        <app-carousel></app-carousel>
        <!-- ##### Top Catagory Area Start ##### -->
        <div class="top_catagory_area section-padding-80 clearfix">
            <div class="container">
                <app-categories></app-categories>
            </div>
        </div>
        <!-- ##### Top Catagory Area End ##### -->
        <!-- ##### Top Catagory Area End ##### -->

        <!-- ##### CTA Area Start ##### -->
        <div class="cta-area">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <div class="cta-content bg-img background-overlay">
                            <div class="h-100 d-flex align-items-center justify-content-end">
                                <div class="cta--text">
                                    <h6>-60%</h6>
                                    <h2>Global Sale</h2>
                                    <a href="#" class="btn essence-btn">Buy Now</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <app-popular-product></app-popular-product>
    </div>
</template>
<script>
    import PopularProduct from "./PopularProduct";
    import Carousel from "./Carousel";
    import Categories from "./Categories";
    export default {
        name: "home",
        components: {
            appPopularProduct: PopularProduct,
            appCarousel: Carousel,
            appCategories: Categories
        },
        created() {
            if (this.$store.getters.popular_products) {
                return
            }
            this.$store.dispatch("Content")
        }
    };

</script>

<style scoped>
    .carousel-item {
        width: 100% !important;
        height: 55vh !important;
    }

    .slider-content h5 {
        color: white;
        font-size: 18px;
    }

    @media only screen and (max-width: 768px) {
        .btn {
            font-size: 8px;
        }
    }

    @media only screen and (min-width: 768px) and (max-width: 991px) {
        .carousel-item {
            width: 100% !important;
            height: 40vh !important;
        }
    }

    @media only screen and (max-width: 767px) {
        .carousel-item {
            width: 100% !important;
            height: 30vh !important;
        }
    }

    .welcome_area {
        width: 100%;
        height: 600px;
    }

    @media only screen and (min-width: 768px) and (max-width: 991px) {
        .welcome_area {
            height: 450px;
        }
    }

    @media only screen and (max-width: 767px) {
        .welcome_area {
            height: 350px;
        }
    }

    .welcome_area .hero-content h6 {
        font-size: 18px;
        color: #787878;
        margin-bottom: 10px;
    }

    .welcome_area .hero-content h2 {
        font-size: 60px;
        color: #000000;
        margin-bottom: 50px;
    }

    @media only screen and (min-width: 768px) and (max-width: 991px) {
        .welcome_area .hero-content h2 {
            font-size: 48px;
        }
    }

    @media only screen and (max-width: 767px) {
        .welcome_area .hero-content h2 {
            font-size: 30px;
        }
    }

    .essence-btn {
        display: inline-block;
        min-width: 170px;
        height: 50px;
        color: #ffffff;
        border: none;
        border-radius: 0;
        padding: 0 40px;
        text-transform: uppercase;
        font-size: 12px;
        line-height: 50px;
        background-color: #0315ff;
        letter-spacing: 1.5px;
        font-weight: 600;
    }

    .section-padding-80 {
        padding-top: 80px;
        padding-bottom: 80px;
    }

    .section-padding-80-0 {
        padding-top: 80px;
        padding-bottom: 0;
    }

    .single_catagory_area {
        width: 100%;
        height: 240px;
        -webkit-transition-duration: 500ms;
        transition-duration: 500ms;
    }

    @media only screen and (min-width: 768px) and (max-width: 991px) {
        .single_catagory_area {
            height: 180px;
        }
    }

    @media only screen and (max-width: 767px) {
        .single_catagory_area {
            height: 180px;
        }
    }

    @media only screen and (min-width: 576px) and (max-width: 767px) {
        .single_catagory_area {
            margin-bottom: 30px;
        }
    }

    .single_catagory_area:after {
        -webkit-transition-duration: 500ms;
        transition-duration: 500ms;
        content: "";
        width: 100%;
        height: 100%;
        background-color: rgba(255, 255, 255, 0.6);
        top: 0;
        left: 0;
        z-index: -10;
    }

    .single_catagory_area .catagory-content a {
        display: block;
        font-size: 30px;
        font-weight: 700;
        color: #000000;
        letter-spacing: 1px;
        text-transform: uppercase;
    }

    @media only screen and (min-width: 768px) and (max-width: 991px) {
        .single_catagory_area .catagory-content a {
            font-size: 20px;
        }
    }

    @media only screen and (max-width: 767px) {
        .single_catagory_area .catagory-content a {
            font-size: 18px;
        }
    }

    .single_catagory_area:hover .catagory-content a {
        color: #0315ff;
    }

    .cta-area {
        position: relative;
        z-index: 1;
        background-position: center center;
        background-repeat: no-repeat;
    }

    .cta-area .cta-content {
        width: 100%;
        height: 550px;
    }

    .bg-img {
        background-position: center center;
        background-size: cover;
        background-repeat: no-repeat;
    }

    .h-100 {
        height: 100% !important;
    }

    .align-items-center {
        -ms-flex-align: center !important;
        align-items: center !important;
    }

    .justify-content-end {
        -ms-flex-pack: end !important;
        justify-content: flex-end !important;
    }

    .d-flex {
        display: -ms-flexbox !important;
        display: flex !important;
    }

    .cta-area .cta-content .cta--text {
        padding-right: 150px;
    }

    .cta-area .cta-content h6 {
        font-size: 24px;
        color: #dc0345;
        margin-bottom: 10px;
    }

    .cta-area .cta-content h2 {
        font-size: 60px;
        color: #000000;
        margin-bottom: 50px;
    }

</style>

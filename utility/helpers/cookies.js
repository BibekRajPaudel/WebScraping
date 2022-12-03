const getStaticCookies = (cookies) => {
    let JSESSIONID,
            BNI_JSESSIONID,
             __utma,
            __utmc,
            __utmz,
            __utmt,
            __utmt_b,
            __utmb;
        
        cookies.forEach((cookie, i) => {
            if (cookie.name == "JSESSIONID") {
                JSESSIONID = cookie.value;
            }
            if (cookie.name == "BNI_JSESSIONID") {
                BNI_JSESSIONID = cookie.value;
            }
            if (cookie.name == "__utma") {
                __utma = cookie.value;
            }
            if (cookie.name == "__utmc") {
                __utmc = cookie.value;
            }
            if (cookie.name == "__utmz") {
                __utmz = cookie.value;
            }
            if (cookie.name == "__utmt") {
                __utmt = cookie.value;
            }
            if (cookie.name == "__utmt_b") {
                __utmt_b = cookie.value;
            }
            if (cookie.name == "__utmb") {
                __utmb = cookie.value;
            }
        });
    let getCookies = {JSESSIONID, BNI_JSESSIONID, __utma, __utmc, __utmz, __utmt, __utmt_b, __utmb}
    
    return getCookies;
}



module.exports = getStaticCookies
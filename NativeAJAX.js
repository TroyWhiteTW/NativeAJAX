/**
 * @param sMethod {string} 'GET' or 'POST'
 * @param sUrl {string}
 * @param oParameter {object}
 * @param fSuccessCallBack {function} callback function
 * @param fFailCallBack {function} callback function optional
 */
const ajax = (sMethod, sUrl, oParameter, fSuccessCallBack, fFailCallBack = null) => {
    // if (sMethod !== 'GET' || sMethod !== 'POST') return 'method error!!';

    // 1. 創建 ajax 物件
    const xhttp = new XMLHttpRequest();

    switch (sMethod) {
        case 'GET':
            if (oParameter !== null) {
                sUrl += '?';
                for (let key in oParameter) {
                    sUrl += `${key}=${oParameter[key]}&`;
                }
                sUrl = sUrl.substr(0, sUrl.length - 1);
            }

            // 2. 連接伺服器
            xhttp.open(sMethod, sUrl, true);
            // 3. 發送請求
            xhttp.send();

            break;
        case 'POST':
            let sParameter = '';

            if (oParameter !== null) {
                for (let key in oParameter) {
                    sParameter += `${key}=${oParameter[key]}&`;
                }
                sParameter = sParameter.substr(0, sParameter.length - 1);
            }

            xhttp.open(sMethod, sUrl, true);
            xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhttp.send(sParameter);

            break;
    }

    // 4. 接收返回
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState === 4) {
            if (xhttp.status === 200) {
                fSuccessCallBack(xhttp.responseText);
            } else {
                if (fFailCallBack) {
                    fFailCallBack(xhttp.status);
                }
            }
        }
    };
};


function ajaxObject() {
    var xmlHttp;
    try {
        xmlHttp = new XMLHttpRequest();
    }
    catch (e) {
        try {
            xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {
                console.log("你的浏览器也太老了吧。");
                return false;
            }
        }
    }
    return xmlHttp;
}
const tkAjax = ajaxObject();
function LsPut(k, v) {
    try {
        localStorage.setItem(k, v);
        return true;
    } catch (e) {
        console.log(`localStorage 的设置出现了些问题：${e}`);
        return false;
    }
}
function LsGet(k) {
    try {
        return localStorage.getItem(k);
    } catch (e) {
        console.log(`localStorage 的读取出现了些问题：${e}`);
        return false;
    }
}
function formatDate(time) {
    var date = new Date(parseInt(time));
    var year = date.getFullYear();
    var mon = date.getMonth() + 1;
    var day = date.getDate();
    return year + '/' + mon + '/' + day;
}
function getJsonLength(jsonData) {

    var jsonLength = 0;

    for (var item in jsonData) {

        jsonLength++;

    }

    return jsonLength;
}

function use_twikoo(envId, id, region, path, ver) {
    console.log('Use Twikoo.')
    document.getElementById(id).innerHTML = `<div id='twikooComment'><\/div>`
    tkAjax.open('get', `https://cdn.jsdelivr.net/npm/twikoo@${ver}/dist/twikoo.all.min.js`, true);
    tkAjax.onreadystatechange = function () {
        if (tkAjax.readyState == 4) {
            if (tkAjax.status >= 200) {
                var script = document.createElement('script');
                script.text = tkAjax.responseText;
                document.body.appendChild(script);
                twikoo.init({ envId: envId, el: '#twikooComment', region: region, path: path })
            }
        }
    };
    tkAjax.send();
}
function use_twikooPlus(id, domain, path_r, cdn, adminmail, envId, region, ver) {
    var path = eval(path_r);
    var avatarLazyLoadClass = "tk-avatar-lazyload";
    console.log('Use TwikooPlus');

    var back = `https://${domain}/`;

    let before = 0

    tkAjax.open("post", back, true);
    tkAjax.setRequestHeader("Content-Type", "text/plain");
    tkAjax.onreadystatechange = function () {
        if (tkAjax.readyState == 4) {
            if (tkAjax.status == 200) {

                document.getElementById(id).innerHTML = `<ol class="hpp_twikooplus_comment-list" id="hpp_twikooplus_comment_list"></ol>`;
                let count = JSON.parse(JSON.parse(tkAjax.responseText)["data"]["response_data"])["count"];
                let res = JSON.parse(JSON.parse(tkAjax.responseText)["data"]["response_data"])["data"];
                LsPut("hpp_twikooplus_count", count);
                for (var i = 0; i < getJsonLength(res); i++) {
                    count--;
                    if (res[i]["isSpam"] != true) {
                        if (res[i]['mailMd5'] == adminmail) {
                            idman = '博主';
                        };
                        document.getElementById("hpp_twikooplus_comment_list").innerHTML += `<li data-no-instant="" class="hpp_twikooplus_comment-body hpp_twikooplus_comment-parent hpp_twikooplus_comment-even" style="list-style:none;"> 
    <div id="${res[i]['id']}"> 
     <img class="hpp_twikooplus_avatar ${avatarLazyLoadClass}" src="${cdn}${res[i]['mailMd5']}" alt="${res[i]['nick']}" width="80" height="80" /> 
     <div class="hpp_twikooplus_comment-main"> 
      <p class="hpp_twikooplus_comment-at"></p>
	  <p>${res[i]['comment']}</p>
      <div class="hpp_twikooplus_comment-meta"> 
       <span class="hpp_twikooplus_comment-author"><a class="hpp_twikooplus_comment_a_href" href="${res[i]['link']}" target="_blank" rel="external nofollow">${res[i]['nick']}</a></span> 
       <span class="hpp_twikooplus_CommentIdentify" style="color: #FFF;padding: 2px 4px;font-size: 12px;border-radius: 3px;background-color: ${color}">${idman}</span> | 
       <time class="hpp_twikooplus_comment-time">${formatDate(res[i]['created'])}</time> | ${res[i]['os']} |<svg t="1612242849495" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2435" width="16" height="16"><path d="M946.026 471.766501c0 36.496562-10.066693 69.91527-30.175764 100.254845 3.693424 13.533598 5.546535 27.677647 5.546535 42.438547 0 31.580954-7.810454 61.110433-23.408325 88.573078 1.236261 8.611591 1.854391 17.438185 1.854391 26.450345 0 41.419848-12.321653 77.91641-36.952161 109.483287 0.401849 56.998523-17.042735 102.009413-52.349108 135.010916-35.314052 33.001502-81.906742 49.510572-139.795986 49.510572l-22.172064 0-57.269835 0c-39.415724 0-78.318259-4.611022-116.707604-13.838184-38.388066-9.220763-82.830738-22.658378-133.325455-40.28213-47.635705-16.411807-75.966036-24.606192-84.989714-24.606192L78.919752 944.761585c-21.766376 0-40.33972-7.688875-55.732827-23.066626C7.789977 906.314649 0.090864 887.768181 0.090864 866.032519L0.090864 472.375673c0-21.727983 7.699113-40.28213 23.09606-55.65988 15.393108-15.37775 33.966451-23.066626 55.732827-23.066626l168.739329 0c14.778817-9.837614 42.900545-41.613094 84.371584-95.339237 23.802495-30.749102 45.774915-56.990844 65.891664-78.726506 9.85809-10.247141 17.139998-27.77363 21.867479-52.588426 4.713403-24.807117 10.974052-50.744273 18.784506-77.812748 7.787418-27.060797 20.519878-49.204706 38.180743-66.427889 16.007399-15.162749 34.487319-22.754361 55.424402-22.754361 34.487319 0 65.482137 6.670176 92.993414 19.988772 27.503598 13.332673 48.439402 34.13922 62.81765 62.433718 14.361611 28.286819 21.553934 66.427889 21.553934 114.398894 0 38.13979-9.85809 77.500484-29.558913 118.101277l108.382682 0c42.699621 0 79.651782 15.586353 110.855203 46.743703C930.42045 392.831392 946.026 429.535277 946.026 471.766501zM146.047677 854.343074c7.791257-7.786138 11.700963-17.01458 11.700963-27.677647 0-10.655389-3.908426-19.883831-11.700963-27.677647-7.806614-7.786138-17.042735-11.689445-27.71604-11.689445-10.680984 0-19.917105 3.904587-27.712201 11.689445-7.802775 7.792537-11.700963 17.020979-11.700963 27.677647 0 10.663067 3.898188 19.891509 11.700963 27.677647 7.795096 7.792537 17.031217 11.689445 27.712201 11.689445C129.004942 866.032519 138.241062 862.135611 146.047677 854.343074zM867.200952 472.375673c0-20.910208-8.011378-39.255752-24.018777-55.050708-16.015077-15.779599-34.286394-23.677077-54.812671-23.677077L571.595182 393.647887c0-23.77306 9.850412-56.485334 29.558913-98.106106 19.708502-41.613094 29.558913-74.518613 29.558913-98.722957 0-40.177189-6.566514-69.907591-19.700823-89.18225-13.148386-19.26698-39.415724-28.911348-78.832727-28.911348-10.677145 10.670746-18.472241 28.093573-23.400646 52.28384-4.928405 24.197945-11.190334 49.926498-18.784506 77.194618-7.601851 27.275799-19.812163 49.725574-36.638617 67.349325-9.039036 9.437045-24.84551 28.093573-47.419423 55.972145-1.645788 2.052756-6.373269 8.209743-14.168365 18.449205-7.802775 10.25482-14.265628 18.665487-19.394957 25.223043-5.137008 6.558836-12.22567 15.281767-21.249348 26.13808-9.031357 10.87167-17.243659 19.891509-24.629228 27.060797-7.393248 7.183365-15.300964 14.456314-23.714191 21.840603-8.420905 7.376611-16.625529 12.916747-24.629228 16.605053-8.011378 3.688305-15.300964 5.532458-21.867479 5.532458l-19.708502 0 0 393.656846 19.708502 0c5.331534 0 11.800785 0.609172 19.402636 1.844153 7.586493 1.227302 14.361611 2.565945 20.318953 3.992891 5.948384 1.442304 13.751159 3.695984 23.400646 6.767439 9.641809 3.079133 16.834132 5.442874 21.553934 7.072025 4.719802 1.643228 12.009388 4.216852 21.867479 7.688875 9.850412 3.49506 15.798796 5.643798 17.854111 6.461573 86.627824 29.937726 156.831042 44.89955 210.623734 44.89955l74.513494 0c78.832727 0 118.240772-34.236483 118.240772-102.715848 0-10.663067-1.027658-22.145189-3.075294-34.443806 12.315254-6.558836 22.060724-17.319166 29.253048-32.295068 7.176966-14.961824 10.773128-30.034989 10.773128-45.204136 0-15.170427-3.693424-29.313197-11.086672-42.446226 21.756138-20.494282 32.640606-44.89955 32.640606-73.194048 0-10.239462-2.055315-21.616643-6.156987-34.131542-4.109351-12.50722-9.23996-22.241172-15.396947-29.217214 13.134309-0.401849 24.116039-10.046217 32.946472-28.911348C862.778057 503.347456 867.200952 486.734725 867.200952 472.375673z" p-id="2436" fill="#8a8a8a"></path></svg> ${res[i]['like']}
      </div> 
     </div>
<div class="hpp_twikooplus_comment-children" id="${res[i]['id']}_child"></div>	 
    </div></li>`

                        for (var k = 0; k < getJsonLength(res[i]['replies']); k++) {
                            if (res[i]["isSpam"] != true) {
                                if (res[i]['replies'][k]['mailMd5'] == adminmail) { idman = '管理员'; };
                                document.getElementById(res[i]['id'] + "_child").innerHTML += `<div class="hpp_twikooplus_comment-children"> 
     <ol class="hpp_twikooplus_comment-list">
      <li data-no-instant="" class="hpp_twikooplus_comment-body hpp_twikooplus_comment-parent hpp_twikooplus_comment-even" style="list-style:none;"> 
    <div id="${res[i]['replies'][k]['id']}"> 
     <img class="hpp_twikooplus_avatar ${avatarLazyLoadClass}" src="${cdn}${res[i]['replies'][k]['mailMd5']}" alt="${res[i]['replies'][k]['nick']}" width="80" height="80" /> 
     <div class="hpp_twikooplus_comment-main"> 
      <p class="hpp_twikooplus_comment-at"></p>
	  <p>${res[i]['replies'][k]['comment']}</p>
      <div class="hpp_twikooplus_comment-meta"> 
       <span class="hpp_twikooplus_comment-author"><a class="hpp_twikooplus_comment_a_href" href="${res[i]['replies'][k]['link']}" target="_blank" rel="external nofollow">${res[i]['replies'][k]['nick']}</a></span> 
       <span class="hpp_twikooplus_CommentIdentify" style="color: #FFF;padding: 2px 4px;font-size: 12px;border-radius: 3px;background-color: ${color}">${idman}</span> | 
       <time class="hpp_twikooplus_comment-time">${formatDate(res[i]['replies'][k]['created'])}</time> | ${res[i]['replies'][k]['os']} |<svg t="1612242849495" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2435" width="16" height="16"><path d="M946.026 471.766501c0 36.496562-10.066693 69.91527-30.175764 100.254845 3.693424 13.533598 5.546535 27.677647 5.546535 42.438547 0 31.580954-7.810454 61.110433-23.408325 88.573078 1.236261 8.611591 1.854391 17.438185 1.854391 26.450345 0 41.419848-12.321653 77.91641-36.952161 109.483287 0.401849 56.998523-17.042735 102.009413-52.349108 135.010916-35.314052 33.001502-81.906742 49.510572-139.795986 49.510572l-22.172064 0-57.269835 0c-39.415724 0-78.318259-4.611022-116.707604-13.838184-38.388066-9.220763-82.830738-22.658378-133.325455-40.28213-47.635705-16.411807-75.966036-24.606192-84.989714-24.606192L78.919752 944.761585c-21.766376 0-40.33972-7.688875-55.732827-23.066626C7.789977 906.314649 0.090864 887.768181 0.090864 866.032519L0.090864 472.375673c0-21.727983 7.699113-40.28213 23.09606-55.65988 15.393108-15.37775 33.966451-23.066626 55.732827-23.066626l168.739329 0c14.778817-9.837614 42.900545-41.613094 84.371584-95.339237 23.802495-30.749102 45.774915-56.990844 65.891664-78.726506 9.85809-10.247141 17.139998-27.77363 21.867479-52.588426 4.713403-24.807117 10.974052-50.744273 18.784506-77.812748 7.787418-27.060797 20.519878-49.204706 38.180743-66.427889 16.007399-15.162749 34.487319-22.754361 55.424402-22.754361 34.487319 0 65.482137 6.670176 92.993414 19.988772 27.503598 13.332673 48.439402 34.13922 62.81765 62.433718 14.361611 28.286819 21.553934 66.427889 21.553934 114.398894 0 38.13979-9.85809 77.500484-29.558913 118.101277l108.382682 0c42.699621 0 79.651782 15.586353 110.855203 46.743703C930.42045 392.831392 946.026 429.535277 946.026 471.766501zM146.047677 854.343074c7.791257-7.786138 11.700963-17.01458 11.700963-27.677647 0-10.655389-3.908426-19.883831-11.700963-27.677647-7.806614-7.786138-17.042735-11.689445-27.71604-11.689445-10.680984 0-19.917105 3.904587-27.712201 11.689445-7.802775 7.792537-11.700963 17.020979-11.700963 27.677647 0 10.663067 3.898188 19.891509 11.700963 27.677647 7.795096 7.792537 17.031217 11.689445 27.712201 11.689445C129.004942 866.032519 138.241062 862.135611 146.047677 854.343074zM867.200952 472.375673c0-20.910208-8.011378-39.255752-24.018777-55.050708-16.015077-15.779599-34.286394-23.677077-54.812671-23.677077L571.595182 393.647887c0-23.77306 9.850412-56.485334 29.558913-98.106106 19.708502-41.613094 29.558913-74.518613 29.558913-98.722957 0-40.177189-6.566514-69.907591-19.700823-89.18225-13.148386-19.26698-39.415724-28.911348-78.832727-28.911348-10.677145 10.670746-18.472241 28.093573-23.400646 52.28384-4.928405 24.197945-11.190334 49.926498-18.784506 77.194618-7.601851 27.275799-19.812163 49.725574-36.638617 67.349325-9.039036 9.437045-24.84551 28.093573-47.419423 55.972145-1.645788 2.052756-6.373269 8.209743-14.168365 18.449205-7.802775 10.25482-14.265628 18.665487-19.394957 25.223043-5.137008 6.558836-12.22567 15.281767-21.249348 26.13808-9.031357 10.87167-17.243659 19.891509-24.629228 27.060797-7.393248 7.183365-15.300964 14.456314-23.714191 21.840603-8.420905 7.376611-16.625529 12.916747-24.629228 16.605053-8.011378 3.688305-15.300964 5.532458-21.867479 5.532458l-19.708502 0 0 393.656846 19.708502 0c5.331534 0 11.800785 0.609172 19.402636 1.844153 7.586493 1.227302 14.361611 2.565945 20.318953 3.992891 5.948384 1.442304 13.751159 3.695984 23.400646 6.767439 9.641809 3.079133 16.834132 5.442874 21.553934 7.072025 4.719802 1.643228 12.009388 4.216852 21.867479 7.688875 9.850412 3.49506 15.798796 5.643798 17.854111 6.461573 86.627824 29.937726 156.831042 44.89955 210.623734 44.89955l74.513494 0c78.832727 0 118.240772-34.236483 118.240772-102.715848 0-10.663067-1.027658-22.145189-3.075294-34.443806 12.315254-6.558836 22.060724-17.319166 29.253048-32.295068 7.176966-14.961824 10.773128-30.034989 10.773128-45.204136 0-15.170427-3.693424-29.313197-11.086672-42.446226 21.756138-20.494282 32.640606-44.89955 32.640606-73.194048 0-10.239462-2.055315-21.616643-6.156987-34.131542-4.109351-12.50722-9.23996-22.241172-15.396947-29.217214 13.134309-0.401849 24.116039-10.046217 32.946472-28.911348C862.778057 503.347456 867.200952 486.734725 867.200952 472.375673z" p-id="2436" fill="#8a8a8a"></path></svg> ${res[i]['replies'][k]['like']}
      </div> 
     </div>
<div class="hpp_twikooplus_comment-children" id="${res[i]['replies'][k]['id']}_child"></div>	 
    </div></li> 
     </ol> 
    </div>`
                            }
                        }
                        before = res[i]["created"];
                    }
                }
                document.getElementById("hpp_twikooplus_comment_list").innerHTML = `<p style="text-align:center">您正在使用评论基础模式 | <strong><a href="javascript:use_twikoo('${envId}','${id}','${region}','${path_r}','${ver}')">强制使用完整评论模式</a></strong></p>` + document.getElementById("hpp_twikooplus_comment_list").innerHTML;
                if (count > 0) {
                    document.getElementById("hpp_twikooplus_comment_list").innerHTML += `<button onclick="hpp_comment_loadmore('${id}','${domain}','${path_r}','${cdn}','${adminmail}',${before},'${envId}','${ver}','${region}')" class="hpp_comment_loadmore">还有 ${count} 条评论</button><div class="hpp_twikooplus-footer">
  Powered by <a  href="https://hexoplusplus.js.org" target="_blank">HexoPlusPlus_TwikooPlus</a>${ver}</div>`
                } else {
                    document.getElementById("hpp_twikooplus_comment_list").innerHTML += `<button class="hpp_comment_loadmore">没有更多了！</button><div class="hpp_twikooplus-footer">
  Powered by <a  href="https://hexoplusplus.js.org" target="_blank">HexoPlusPlus_TwikooPlus</a>${ver}</div>`
                }
                localStorage.setItem("hpp_twikooplus_count", count)
            }
            else {
                //console.log("ERROR")
            }
        }
    }
    comment_init = { path: path }
    tkAjax.send(JSON.stringify(comment_init));
}

function hpp_comment_loadmore(id,domain,path_r,cdn,adminmail,before,envId,ver,region) {

    var avatarLazyLoadClass = "tk-avatar-lazyload"
    var path = eval(path_r)
    count = localStorage.getItem("hpp_twikooplus_count")
    console.log(id);
    document.getElementById("hpp_twikooplus_comment_list").innerHTML = `<p style="text-align:center">Loading... | <strong><a href="javascript:use_twikoo('${envId}','${id}','${region}','${path_r}','${ver}')">强制使用完整评论模式</a></strong></p></p><div class="hpp_twikooplus-footer">
  Powered by <a  href="https://hexoplusplus.js.org" target="_blank">HexoPlusPlus_TwikooPlus</a>${ver}</div>`
    back = `https://${domain}/`

    tkAjax.open("post", back, true);
    tkAjax.setRequestHeader("Content-Type", "text/plain");
    tkAjax.onreadystatechange = function () {
        if (tkAjax.readyState == 4) {
            if (tkAjax.status == 200) {
                document.getElementById("hpp_twikooplus_comment_list").innerHTML = ``
                let res = JSON.parse(JSON.parse(tkAjax.responseText)["data"]["response_data"])["data"]
                //console.log(res)
                for (var i = 0; i < getJsonLength(res); i++) {
                    count--;
                    if (res[i]["isSpam"] != true) {
                        if (res[i]['mailMd5'] == adminmail) { idman = '管理员'; };
                        document.getElementById("hpp_twikooplus_comment_list").innerHTML += `<li data-no-instant="" class="hpp_twikooplus_comment-body hpp_twikooplus_comment-parent hpp_twikooplus_comment-even" style="list-style:none;"> 
    <div id="${res[i]['id']}"> 
     <img class="hpp_twikooplus_avatar ${avatarLazyLoadClass}" src="${cdn}${res[i]['mailMd5']}" alt="${res[i]['nick']}" width="80" height="80" /> 
     <div class="hpp_twikooplus_comment-main"> 
      <p class="hpp_twikooplus_comment-at"></p>
	  <p>${res[i]['comment']}</p>
      <div class="hpp_twikooplus_comment-meta"> 
       <span class="hpp_twikooplus_comment-author"><a class="hpp_twikooplus_comment_a_href" href="${res[i]['link']}" target="_blank" rel="external nofollow">${res[i]['nick']}</a></span> 
       <span class="hpp_twikooplus_CommentIdentify" style="color: #FFF;padding: 2px 4px;font-size: 12px;border-radius: 3px;background-color: ${color}">${idman}</span> | 
       <time class="hpp_twikooplus_comment-time">${formatDate(res[i]['created'])}</time> | ${res[i]['os']} |<svg t="1612242849495" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2435" width="16" height="16"><path d="M946.026 471.766501c0 36.496562-10.066693 69.91527-30.175764 100.254845 3.693424 13.533598 5.546535 27.677647 5.546535 42.438547 0 31.580954-7.810454 61.110433-23.408325 88.573078 1.236261 8.611591 1.854391 17.438185 1.854391 26.450345 0 41.419848-12.321653 77.91641-36.952161 109.483287 0.401849 56.998523-17.042735 102.009413-52.349108 135.010916-35.314052 33.001502-81.906742 49.510572-139.795986 49.510572l-22.172064 0-57.269835 0c-39.415724 0-78.318259-4.611022-116.707604-13.838184-38.388066-9.220763-82.830738-22.658378-133.325455-40.28213-47.635705-16.411807-75.966036-24.606192-84.989714-24.606192L78.919752 944.761585c-21.766376 0-40.33972-7.688875-55.732827-23.066626C7.789977 906.314649 0.090864 887.768181 0.090864 866.032519L0.090864 472.375673c0-21.727983 7.699113-40.28213 23.09606-55.65988 15.393108-15.37775 33.966451-23.066626 55.732827-23.066626l168.739329 0c14.778817-9.837614 42.900545-41.613094 84.371584-95.339237 23.802495-30.749102 45.774915-56.990844 65.891664-78.726506 9.85809-10.247141 17.139998-27.77363 21.867479-52.588426 4.713403-24.807117 10.974052-50.744273 18.784506-77.812748 7.787418-27.060797 20.519878-49.204706 38.180743-66.427889 16.007399-15.162749 34.487319-22.754361 55.424402-22.754361 34.487319 0 65.482137 6.670176 92.993414 19.988772 27.503598 13.332673 48.439402 34.13922 62.81765 62.433718 14.361611 28.286819 21.553934 66.427889 21.553934 114.398894 0 38.13979-9.85809 77.500484-29.558913 118.101277l108.382682 0c42.699621 0 79.651782 15.586353 110.855203 46.743703C930.42045 392.831392 946.026 429.535277 946.026 471.766501zM146.047677 854.343074c7.791257-7.786138 11.700963-17.01458 11.700963-27.677647 0-10.655389-3.908426-19.883831-11.700963-27.677647-7.806614-7.786138-17.042735-11.689445-27.71604-11.689445-10.680984 0-19.917105 3.904587-27.712201 11.689445-7.802775 7.792537-11.700963 17.020979-11.700963 27.677647 0 10.663067 3.898188 19.891509 11.700963 27.677647 7.795096 7.792537 17.031217 11.689445 27.712201 11.689445C129.004942 866.032519 138.241062 862.135611 146.047677 854.343074zM867.200952 472.375673c0-20.910208-8.011378-39.255752-24.018777-55.050708-16.015077-15.779599-34.286394-23.677077-54.812671-23.677077L571.595182 393.647887c0-23.77306 9.850412-56.485334 29.558913-98.106106 19.708502-41.613094 29.558913-74.518613 29.558913-98.722957 0-40.177189-6.566514-69.907591-19.700823-89.18225-13.148386-19.26698-39.415724-28.911348-78.832727-28.911348-10.677145 10.670746-18.472241 28.093573-23.400646 52.28384-4.928405 24.197945-11.190334 49.926498-18.784506 77.194618-7.601851 27.275799-19.812163 49.725574-36.638617 67.349325-9.039036 9.437045-24.84551 28.093573-47.419423 55.972145-1.645788 2.052756-6.373269 8.209743-14.168365 18.449205-7.802775 10.25482-14.265628 18.665487-19.394957 25.223043-5.137008 6.558836-12.22567 15.281767-21.249348 26.13808-9.031357 10.87167-17.243659 19.891509-24.629228 27.060797-7.393248 7.183365-15.300964 14.456314-23.714191 21.840603-8.420905 7.376611-16.625529 12.916747-24.629228 16.605053-8.011378 3.688305-15.300964 5.532458-21.867479 5.532458l-19.708502 0 0 393.656846 19.708502 0c5.331534 0 11.800785 0.609172 19.402636 1.844153 7.586493 1.227302 14.361611 2.565945 20.318953 3.992891 5.948384 1.442304 13.751159 3.695984 23.400646 6.767439 9.641809 3.079133 16.834132 5.442874 21.553934 7.072025 4.719802 1.643228 12.009388 4.216852 21.867479 7.688875 9.850412 3.49506 15.798796 5.643798 17.854111 6.461573 86.627824 29.937726 156.831042 44.89955 210.623734 44.89955l74.513494 0c78.832727 0 118.240772-34.236483 118.240772-102.715848 0-10.663067-1.027658-22.145189-3.075294-34.443806 12.315254-6.558836 22.060724-17.319166 29.253048-32.295068 7.176966-14.961824 10.773128-30.034989 10.773128-45.204136 0-15.170427-3.693424-29.313197-11.086672-42.446226 21.756138-20.494282 32.640606-44.89955 32.640606-73.194048 0-10.239462-2.055315-21.616643-6.156987-34.131542-4.109351-12.50722-9.23996-22.241172-15.396947-29.217214 13.134309-0.401849 24.116039-10.046217 32.946472-28.911348C862.778057 503.347456 867.200952 486.734725 867.200952 472.375673z" p-id="2436" fill="#8a8a8a"></path></svg> ${res[i]['like']}
      </div> 
     </div>
<div class="hpp_twikooplus_comment-children" id="${res[i]['id']}_child"></div>	 
    </div></li>`

                        for (var k = 0; k < getJsonLength(res[i]['replies']); k++) {
                            if (res[i]["isSpam"] != true) {
                                if (res[i]['replies'][k]['mailMd5'] == adminmail) { idman = '管理员';};
                                
                                document.getElementById(res[i]['id'] + "_child").innerHTML += `<div class="hpp_twikooplus_comment-children"> 
     <ol class="hpp_twikooplus_comment-list">
      <li data-no-instant="" class="hpp_twikooplus_comment-body hpp_twikooplus_comment-parent hpp_twikooplus_comment-even" style="list-style:none;"> 
    <div id="${res[i]['replies'][k]['id']}"> 
     <img class="hpp_twikooplus_avatar ${avatarLazyLoadClass}" src="${cdn}${res[i]['replies'][k]['mailMd5']}" alt="${res[i]['replies'][k]['nick']}" width="80" height="80" /> 
     <div class="hpp_twikooplus_comment-main"> 
      <p class="hpp_twikooplus_comment-at"></p>
	  <p>${res[i]['replies'][k]['comment']}</p>
      <div class="hpp_twikooplus_comment-meta"> 
       <span class="hpp_twikooplus_comment-author"><a class="hpp_twikooplus_comment_a_href" href="${res[i]['replies'][k]['link']}" target="_blank" rel="external nofollow">${res[i]['replies'][k]['nick']}</a></span> 
       <span class="hpp_twikooplus_CommentIdentify" style="color: #FFF;padding: 2px 4px;font-size: 12px;border-radius: 3px;background-color: ${color}">${idman}</span> | 
       <time class="hpp_twikooplus_comment-time">${formatDate(res[i]['replies'][k]['created'])}</time> | ${res[i]['replies'][k]['os']} |<svg t="1612242849495" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2435" width="16" height="16"><path d="M946.026 471.766501c0 36.496562-10.066693 69.91527-30.175764 100.254845 3.693424 13.533598 5.546535 27.677647 5.546535 42.438547 0 31.580954-7.810454 61.110433-23.408325 88.573078 1.236261 8.611591 1.854391 17.438185 1.854391 26.450345 0 41.419848-12.321653 77.91641-36.952161 109.483287 0.401849 56.998523-17.042735 102.009413-52.349108 135.010916-35.314052 33.001502-81.906742 49.510572-139.795986 49.510572l-22.172064 0-57.269835 0c-39.415724 0-78.318259-4.611022-116.707604-13.838184-38.388066-9.220763-82.830738-22.658378-133.325455-40.28213-47.635705-16.411807-75.966036-24.606192-84.989714-24.606192L78.919752 944.761585c-21.766376 0-40.33972-7.688875-55.732827-23.066626C7.789977 906.314649 0.090864 887.768181 0.090864 866.032519L0.090864 472.375673c0-21.727983 7.699113-40.28213 23.09606-55.65988 15.393108-15.37775 33.966451-23.066626 55.732827-23.066626l168.739329 0c14.778817-9.837614 42.900545-41.613094 84.371584-95.339237 23.802495-30.749102 45.774915-56.990844 65.891664-78.726506 9.85809-10.247141 17.139998-27.77363 21.867479-52.588426 4.713403-24.807117 10.974052-50.744273 18.784506-77.812748 7.787418-27.060797 20.519878-49.204706 38.180743-66.427889 16.007399-15.162749 34.487319-22.754361 55.424402-22.754361 34.487319 0 65.482137 6.670176 92.993414 19.988772 27.503598 13.332673 48.439402 34.13922 62.81765 62.433718 14.361611 28.286819 21.553934 66.427889 21.553934 114.398894 0 38.13979-9.85809 77.500484-29.558913 118.101277l108.382682 0c42.699621 0 79.651782 15.586353 110.855203 46.743703C930.42045 392.831392 946.026 429.535277 946.026 471.766501zM146.047677 854.343074c7.791257-7.786138 11.700963-17.01458 11.700963-27.677647 0-10.655389-3.908426-19.883831-11.700963-27.677647-7.806614-7.786138-17.042735-11.689445-27.71604-11.689445-10.680984 0-19.917105 3.904587-27.712201 11.689445-7.802775 7.792537-11.700963 17.020979-11.700963 27.677647 0 10.663067 3.898188 19.891509 11.700963 27.677647 7.795096 7.792537 17.031217 11.689445 27.712201 11.689445C129.004942 866.032519 138.241062 862.135611 146.047677 854.343074zM867.200952 472.375673c0-20.910208-8.011378-39.255752-24.018777-55.050708-16.015077-15.779599-34.286394-23.677077-54.812671-23.677077L571.595182 393.647887c0-23.77306 9.850412-56.485334 29.558913-98.106106 19.708502-41.613094 29.558913-74.518613 29.558913-98.722957 0-40.177189-6.566514-69.907591-19.700823-89.18225-13.148386-19.26698-39.415724-28.911348-78.832727-28.911348-10.677145 10.670746-18.472241 28.093573-23.400646 52.28384-4.928405 24.197945-11.190334 49.926498-18.784506 77.194618-7.601851 27.275799-19.812163 49.725574-36.638617 67.349325-9.039036 9.437045-24.84551 28.093573-47.419423 55.972145-1.645788 2.052756-6.373269 8.209743-14.168365 18.449205-7.802775 10.25482-14.265628 18.665487-19.394957 25.223043-5.137008 6.558836-12.22567 15.281767-21.249348 26.13808-9.031357 10.87167-17.243659 19.891509-24.629228 27.060797-7.393248 7.183365-15.300964 14.456314-23.714191 21.840603-8.420905 7.376611-16.625529 12.916747-24.629228 16.605053-8.011378 3.688305-15.300964 5.532458-21.867479 5.532458l-19.708502 0 0 393.656846 19.708502 0c5.331534 0 11.800785 0.609172 19.402636 1.844153 7.586493 1.227302 14.361611 2.565945 20.318953 3.992891 5.948384 1.442304 13.751159 3.695984 23.400646 6.767439 9.641809 3.079133 16.834132 5.442874 21.553934 7.072025 4.719802 1.643228 12.009388 4.216852 21.867479 7.688875 9.850412 3.49506 15.798796 5.643798 17.854111 6.461573 86.627824 29.937726 156.831042 44.89955 210.623734 44.89955l74.513494 0c78.832727 0 118.240772-34.236483 118.240772-102.715848 0-10.663067-1.027658-22.145189-3.075294-34.443806 12.315254-6.558836 22.060724-17.319166 29.253048-32.295068 7.176966-14.961824 10.773128-30.034989 10.773128-45.204136 0-15.170427-3.693424-29.313197-11.086672-42.446226 21.756138-20.494282 32.640606-44.89955 32.640606-73.194048 0-10.239462-2.055315-21.616643-6.156987-34.131542-4.109351-12.50722-9.23996-22.241172-15.396947-29.217214 13.134309-0.401849 24.116039-10.046217 32.946472-28.911348C862.778057 503.347456 867.200952 486.734725 867.200952 472.375673z" p-id="2436" fill="#8a8a8a"></path></svg> ${res[i]['replies'][k]['like']}
      </div> 
     </div>
<div class="hpp_twikooplus_comment-children" id="${res[i]['replies'][k]['id']}_child"></div>	 
    </div></li> 
     </ol> 
    </div>`
                            }
                        }
                        before = res[i]["created"];
                    }
                }
                //console.log(id)
                document.getElementById("hpp_twikooplus_comment_list").innerHTML = `<p style="text-align:center">您正在使用评论基础模式 | <strong><a href="javascript:use_twikoo('${envId}','${id}','${region}','${path_r}','${ver}')">强制使用评论完整模式</a></strong></p>` + document.getElementById("hpp_twikooplus_comment_list").innerHTML;
                //console.log('it'+id)
                if (count > 0) {
                    document.getElementById("hpp_twikooplus_comment_list").innerHTML += `<button onclick="hpp_comment_loadmore('${id}','${domain}','${path_r}','${cdn}','${adminmail}',${before},'${envId}','${ver}','${region}')" class="hpp_comment_loadmore">还有 ${count} 条评论</button><div class="hpp_twikooplus-footer">
  Powered by <a  href="https://hexoplusplus.js.org" target="_blank">HexoPlusPlus_TwikooPlus</a>${ver}</div>`
                } else {
                    document.getElementById("hpp_twikooplus_comment_list").innerHTML += `<button class="hpp_comment_loadmore">没有更多了！</button>`
                }
                localStorage.setItem("hpp_twikooplus_count", count)
            }
            else {
                //console.log("ERROR")
            }
        }
    }
    comment_init = { path: path, before: before }
    tkAjax.send(JSON.stringify(comment_init));
}
function hpp_comment({id, domain, path, cdn, adminmail, envId, region, ver}) {
        document.getElementById(id).innerHTML = `<p style="text-align:center">您正在使用评论基础模式 | <strong><a href="javascript:use_twikoo('${envId}','${id}','${region}','${path}','${ver}')">强制使用评论完整模式</a></strong></p></p><div class="hpp_twikooplus-footer">
  Powered by <a  href="https://hexoplusplus.js.org" target="_blank">HexoPlusPlus_TwikooPlus</a>${ver}</div>`; use_twikooPlus(id, domain, path, cdn, adminmail, envId, region, ver)

}
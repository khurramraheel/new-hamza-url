const express = require('express')
const bodyParser = require('body-parser');
const morgan = require('morgan')
const request = require('request')
const session = require('express-session')

const dbConnection = require('./database')

const MongoStore = require('connect-mongo')(session)
/* MongoStore allows me to store the Express sessions into MongoDB instead of using the MemoryStore, which is not designed for a production environment. I do it down below where I am calling express-session's session function and within the object that I am passing to session, the store variable inside the object is for setting MongoDB as my backend, for persisting the application session in my database.
Note - express-session by default uses a MemoryStore (in-memory key-value store for storing session data) implementation that is only designed for development environments, but cant scale in production, as after few user logins it can no more handle all those session data and will crash wiping out all session data
connect-mongo will store my user sessions in my db in a collection named sessions and takes care of removing them based on the maxAge of the cookie configuration for the session. */

const passport = require('./passport')
const app = express()
const PORT = 8080

const user = require('./routes/user')

app.use(morgan('dev'));

const multer = require('multer');
const fs = require('fs');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {

        let path = 'server/uploads/' + req.query.username;

        fs.exists(path, (folderParaHua) => {


            if (folderParaHua) {

                cb(null, path);

            } else {
                fs.mkdir(path, null, (err) => {

                    cb(null, path);

                })
            }

        });



    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + file.originalname)
    }
})

const upload = multer({ storage: storage })



app.post('/upload-drawing', upload.single('file'), async (req, res) => {

    console.log('ok g');
    res.json({
        success: true
    });

});

function exportStyles(body) {



    // .geDialog{\nvisibility:hidden !important;\n}
    // color change krna
    //  .geStatusAlertOrange,\
    // background-image:url(http://'+window.location.host+'/logo.png) !important;\

    body = body + '<style id="testE" type="text/css">\
     .mxPopupMenu tr,\
     .geMenubar :nth-child(3),\
     .geMenubar :nth-child(4),\
     .geMenubar :nth-child(5),\
    .geMenubar :nth-child(6),.geSidebarContainer.geFormatContainer,  .geItem[title=Language], .geSeparator, .geSidebarContainer > :nth-child(4), .geSidebarContainer > :nth-child(5), .geLabel, .geButton, .geSidebarContainer .geTitle:nth-child(3), .geMenubar :nth-child(8){display:none !important;;}\n\n\
    .mxPopupMenu tr.mxPopupMenuItem:nth-child(1),\
    .mxPopupMenu tr.mxPopupMenuItem:nth-child(3),\
    .mxPopupMenu tr.mxPopupMenuItem:nth-child(5),\
    .mxPopupMenu tr.mxPopupMenuItem:nth-child(14),\
    .mxPopupMenu tr.mxPopupMenuItem:nth-child(27),\
    .geToolbarContainer .geButton:nth-child(5),\
    .geToolbarContainer .geButton:nth-child(6),\
    .geToolbarContainer .geButton:nth-child(11)\
    {display:table-row !important;}\
    .geMenubar + a{\
        background-color:#f9fae6 !important;\
    }\
    .geStatusAlertOrange{\
        right:0;\
        position:absolute;\
    }\
    .geMenubarContainer{\
        background: #f9fae6;\
        }\
            .geSidebarContainer{\
            background: #f9fae6;\
            }\
            .geToolbarContainer{\
                overflow:initial;\
                height:initial !important;\
            }\
            .geToolbarContainer .geButton:nth-child(5){\
                margin-top: -30px;\
                margin-left: 130px;\
            }\
            .geToolbarContainer .geButton:nth-child(6) {\
                margin-top: -30px;\
                margin-left: 180px;\
            }\
            .geToolbarContainer .geButton:nth-child(11){\
                margin-top: -30px;\
                margin-left: 220px;\
            }\
            .geSidebarContainer{\
                top:67px !important;\
            }\
            .geBackgroundPage{\
                background-image:none !important;\
            }\
            ellipse{\
                stroke:black;\
                \}\
                path{\
                    stroke:black;\
                    }\
                    rect{\
                        stroke:black;\
                        }\
                    .geStatusAlertOrange{\
                        background-color: black;\
                        color:white !important;\
                    }\
                    .geHsplit{\
                        display:none;\
                        }\
                        .geTabContainer{\
                            display:none;\
                            }\
                        .geDiagramContainer{\
                            width:100%;\
                        }\
                        .geBlock{\
                        display:none;\
                    }\
                    .geSidebar{\
                        display:none;\
                }\
                .mxPopupMenu + .mxPopupMenu tbody :nth-child(5){\
                    display:none !important;\
                }\
                .geDialog{\
                background-color:#f9fae6;\
                height:fit-content !important;\
            }\
            .geDialog > div > div:first-child{\
                display:none;\
            }\
            #confirmation + .geBtn{\
                display:none;\
            }\
            .geStatus{\
            display:none !important;\
            }\
            .f-right{\
                float:right;\
                display:inline-block;\
            }\
            .prev-drawing-thumb{\
                border: 1px solid orange;\
                width:100%;\
            }\
            .modal {\
  display: none;\
  position: fixed;\
  z-index:343;\
  left: 0;\
  top: 0;\
  width: 100%;\
  height: 100%;\
  overflow: auto; \
  background-color: rgb(0,0,0);\
  background-color: rgba(0,0,0,0.4);\
}\
.modal-content {\
   overflow:hidden;\
  background-color: #fefefe;\
  margin: 15% auto; \
  padding: 20px;\
  border: 1px solid #888;\
  width: 80%;\
}\
.close {\
  color: #aaa;\
  float: right;\
  font-size: 28px;\
  font-weight: bold;\
}\
.close:hover,\
.close:focus {\
  color: black;\
  text-decoration: none;\
  cursor: pointer;\
}\
.relative{\
    position:relative;\
}\
.num{\
    position: absolute;\
    display: inline-block;\
    width: 17px;\
    height: 20px;\
    background: #c7d4c7;\
    border-radius: 23px;\
    text-align: center;\
    top: 2px;\
}\
                        </style>'
    return body;
}


function updateNumbers() {


    let prevDrawingsBox = document.querySelector('.prevDrawingsBox');

    [...prevDrawingsBox.children].forEach((box, index) => {

        box.querySelector('.num').innerText = (index + 1);

    });

}


function exportScript(body) {

    

    function saveDrawing() {

        html2canvas(document.querySelector('.geDiagramContainer')).then(function (canvas) {

            canvas.toBlob(async (blob) => {

                let file = new File([blob], ".png");

                let formData = new FormData();
                formData.append('file', file);
                // formData.append('username', window.loggedInUser.username);

                let resp = await axios.post('http://' + window.location.host + '/upload-drawing?username=' + window.loggedInUser.username, formData);

                let prevDrawingsBox = document.querySelector('.prevDrawingsBox');

                let box = document.createElement('div');
                box.className = 'relative';
                box.innerHTML = '<span class="num"></span><img class="prev-drawing-thumb" src="' + URL.createObjectURL(file, { oneTimeOnly: true }) + '" />';

                box.onclick = function (evt) {

                    if (evt.target.nodeName == 'IMG') {
                        document.getElementById('myModal').style.display = "block";
                        currentImgThumb.src = evt.target.src;
                    }

                }

                prevDrawingsBox.insertBefore(box, prevDrawingsBox.firstChild);
                updateNumbers();



            });

        });

    }

    async function startProcess() {

        let canvasLib = document.createElement('script');
        canvasLib.src = 'http://' + window.location.host + '/html2canvas.min.js';
        document.body.append(canvasLib);

        let axiosLib = document.createElement('script');
        axiosLib.src = 'http://' + window.location.host + '/axios.min.js';
        document.body.append(axiosLib);

        let modalDiv = document.createElement('div');
        modalDiv.className = 'modal';
        modalDiv.id = "myModal";
        modalDiv.innerHTML = '<div class="modal-content">\
                <span class="close c-modal">&times;</span>\
                <img id="currentImgThumb">\
            </div>\
        </div>';

        document.body.appendChild(modalDiv);


        var modal = document.getElementById("myModal");

        // Get the button that opens the modal
        // var btn = document.getElementById("myBtn");

        // Get the <span> element that closes the modal
        var span = document.querySelector(".close.c-modal");

        // When the user clicks on the button, open the modal
        // btn.onclick = function () {
        //     modal.style.display = "block";
        // }

        // When the user clicks on <span> (x), close the modal
        span.onclick = function () {
            modal.style.display = "none";
        }


        try {
            let resp = await fetch('http://' + window.location.host + '/checksession');

            let data = await resp.json();

            if (!data) {
                location.href = 'http://' + window.location.host + '/login';
            } else {
                window.loggedInUser = data;
            }


        } catch (e) {

            console.log(e)
        }




        [...document.querySelectorAll('link')].filter(tag => tag.rel && tag.rel.includes('icon')).forEach((tag) => {

            tag.href = 'http://' + location.host + '/logo.png'

        });

        let key = setInterval(() => {

            if (document.querySelector('.geDialog div span')) {
                clearInterval(key);

                document.querySelector('.geDialog div span').click();


            }

            if (document.querySelector('.geMenubar') && !document.getElementById('logoutBTN') && window.loggedInUser) {

                let nameTitle = document.createElement('b');
                nameTitle.innerText = 'Welcome ' + window.loggedInUser.username + ',';
                nameTitle.className = 'f-right geItem';

                let logoutBTN = document.createElement('a');
                logoutBTN.id = 'logoutBTN';
                logoutBTN.innerText = 'Logout';
                logoutBTN.className = 'geItem f-right';
                logoutBTN.href = 'http://' + window.location.host + '/user/logout'
                document.querySelector('.geMenubar').append(logoutBTN);
                document.querySelector('.geMenubar').append(nameTitle);

                let saveDrawings = document.createElement('button');
                saveDrawings.innerText = "Save Drawing";
                saveDrawings.onclick = saveDrawing;
                saveDrawings.className = 'f-right';
                document.querySelector('.geMenubar').append(saveDrawings);


            }

            document.querySelector('.geMenubar + a') &&
                (document.querySelector('.geMenubar + a').style.backgroundImage = 'url(http://' + window.location.host + '/logo.png)') &&
                (document.querySelector('.geMenubar + a').style.pointerEvents = "none");


        }, 20)


        // let key3 = setInterval(() => {

        //     let oldNew = document.querySelector('.mxPopupMenu .mxPopupMenuItem .mxPopupMenuItem');


        //     if (oldNew) {
        //         let newTD = document.createElement('td');
        //         newTD.innerText = 'New Diagram..';
        //         newTD.className = "mxPopupMenuItem"
        //         newTD.onclick = (evt) => {
        //             alert(20);
        //         }
        //         oldNew.replaceWith(newTD);
        //         clearInterval(key3);
        //     }

        // }, 0);

        let titleUpdte = setInterval(() => {

            if (document.title.includes("Untitled")) {
                document.title = "Selecto";
                // clearInterval(titleUpdte);
            }

        }, 0);

        let key2 = setInterval(async () => {


            let elements = document.querySelectorAll('.geSidebarContainer .geTitle');



            if (elements.length) {


                //    let dialog = document.querySelector('.geDialog')
                //    dialog.style.visibility = 'visible';
                //    dialog.style.display = 'none';

                clearInterval(key2);



                elements.forEach(item => item.innerText != 'UML' && item.remove())
                // document.querySelectorAll('.geSidebarContainer .geTitle')[0].remove()
                elements.forEach(function (item) {

                    if (item.innerText.trim() == "UML") {
                        item.innerText = "Shapes";
                        item.click();
                        item.style.pointerEvents = 'none';
                        item.style.backgroundImage = 'none';
                    }

                });

                let prevDrawingsBox = document.createElement('div')

                prevDrawingsBox.className = "prevDrawingsBox";

                document.querySelector('.geSidebarContainer').append(prevDrawingsBox);

                let drawingsList = await axios.get('http://' + window.location.host + '/showdrawings?target=' + window.loggedInUser.username);

                drawingsList.data.reverse().forEach((drawing) => {

                    let box = document.createElement('div');
                    box.className = 'relative';
                    box.innerHTML = '<span class="num"></span><img class="prev-drawing-thumb" src=http://' + window.location.host + '/' + window.loggedInUser.username + '/' + drawing + ' >';

                    box.onclick = function (evt) {

                        if (evt.target.nodeName == 'IMG') {
                            modal.style.display = "block";
                            currentImgThumb.src = evt.target.src;

                        }

                    }

                    prevDrawingsBox.appendChild(box);
                    updateNumbers();


                });

                // document.querySelector('.geSidebarContainer').childNodes[3].remove()

                // for (let i = 0; i < elements.length; i++) {

                //     if (i < 70) {
                //         elements[i].remove();                      
                //     }

                // }
            }

        }, 20);


        let dialogKey = setInterval(() => {

            let createBTN = document.querySelector('.geDialog .geBtn.gePrimaryBtn');
            let prevState = localStorage.getItem('prevState');

            let isPNGSaver = document.querySelectorAll('.geDialog > div > div').length == 2;

            if (isPNGSaver) {

                let dialog = document.querySelector('.geDialog > div div:nth-child(2)');

                let h3 = document.createElement('h3');
                h3.id = "confirmation";
                h3.innerText = 'Are you sure, you want to export this file?';

                let tag = document.getElementById('confirmation');

                if (!tag) {
                    dialog.insertBefore(h3, dialog.firstChild);
                }

                // dialog.appendChild(h3);

                // clearInterval(dialogKey);
                // return document.querySelector('.geDialog .geBtn.gePrimaryBtn').click();
            }

            let isSaveDialog = document.querySelector('.geDialog > div :nth-child(1)');

            if (isSaveDialog && isSaveDialog.nodeName == 'H2') {
                let downloadBTN = document.querySelector('.geDialog > div div > :nth-child(7)');
                if (downloadBTN) {
                    document.querySelector('.geDialog > div div > :nth-child(7)').click();
                }
                return;
            }

            if (createBTN && !isPNGSaver) {
                document.querySelector('.geDialog').style.display = 'none';
                if (prevState == null) {

                    localStorage.setItem('prevState', 'NEW');
                    setTimeout(async () => {
                        await indexedDB.deleteDatabase('database');
                        location.reload();
                    }, 300);

                } else if (prevState == "NEW") {

                    let cancel = document.querySelector('.geDialog > div :nth-child(5) button:nth-child(2)')

                    if (cancel) {
                        localStorage.removeItem('prevState');
                        cancel.click();
                    }

                }
            }


        });

        let btnKey = setInterval(() => {


            let btn = document.querySelector('.geMenubar + a + div > a');

            if (btn) {
                btn.innerText = "Save Your Diagram";
                document.querySelector('.geMenubarContainer').children[2].innerHTML = "<h2 style ='margin:0'>Selecto</h2>"
                // clearInterval(btnKey);
            }

        }, 0);


        // setInterval(()=>{



        // }, 0);





    }

    body = body + '<script>' + updateNumbers.toString() + ' '+ saveDrawing.toString() + ' ' + startProcess.toString() + '\nstartProcess();</script>';

    return body; 

}


app.get('/showdrawings', (req, res) => {

    fs.readdir('server/uploads/' + req.query.target, (err, files) => {

        res.json(files);

    });

});

app.get('/editor', (req, res) => {


    request.get('https://app.diagrams.net/', async (err, response, body) => {

        body = '<base href="https://draw.io" />' + body;

        body = exportStyles(body);

        body = exportScript(body);

        //body = body.replace(/s.setAttribute\('src', src\)/g, "src=  (src[0] != 'h' ? 'http://www.draw.io/' : '')+src\n;s.setAttribute('src', src);")

        res.end(body);

    });

});

/* Create a new morgan logger middleware function using the given format and options. Concise output colored by response status for development use.

However, looking at the Morgan documentation (https://www.npmjs.com/package/morgan) I see many useful pre-defined formats. The combined setting is very useful for logging production bugs - it provides user agent info. So, I could change my above middleware declaration as below.

if (app.get('env') === 'production') {
    app.use(morgan('combined'));
} else {
    app.use(morgan('dev'));
}
*/

app.use(bodyParser.urlencoded({ extended: false }));

/* - The above for parsing application/x-www-form-urlencoded. Parses the text as URL encoded data (which is how browsers tend to send form data from regular forms set to POST) and exposes the resulting object (containing the keys and values) on req.body.

https://www.npmjs.com/package/body-parser#bodyparserurlencodedoptions - Returns middleware that only parses urlencoded bodies and only looks at requests where the Content-Type header matches the type option. The extended option allows to choose between parsing the URL-encoded data with the querystring library (when false) or the qs library (when true). The "extended" syntax allows for rich objects and arrays to be encoded into the URL-encoded format, allowing for a JSON-like experience with URL-encoded. */


app.use(bodyParser.json()); // for parsing application/json




// express-session management
app.use(
    session({
        secret: 'green-india',  //pick a random string to make the hash that is generated secure
        store: new MongoStore({ mongooseConnection: dbConnection }),
        resave: false,
        cookie: {
            httpOnly: false
        },
        saveUninitialized: false
    })
)

/* We're importing the [session function](https://github.com/expressjs/session/blob/master/session/session.js#L24) from the express-session NPM module and passing the session function a configuration object to set properties inside the object passed to express-session. Note **express-session**, requires an object as an argument to initialize it.

Note, We use sessions to maintain state between user requests and we use cookies to transport the session ID between those requests.

**Secret**. Required option. This is a value used in the signing of the session ID cookie, that is stored in the cookie.

**Store**. I’m using MongoDB as my backend, and I want to persist the application sessions in my database, so I am using the connect-mongo NPM module and setting the session store value to an instance of this module.

**resave** - Forces the session to be saved back to the session store, even if the session was never modified during the request. Depending on your store this may be necessary, but it can also create race conditions where a client makes two parallel requests to your server and changes made to the session in one request may get overwritten when the other request ends, even if it made no changes (this behavior also depends on what store you're using). Typically, you'll want false.
How do I know if this is necessary for my store? The best way to know is to check with your store if it implements the touch method. If it does, then you can safely set resave: false. If it does not implement the touch method and your store sets an expiration date on stored sessions, then you likely need resave: true.

**saveUninitialized** - Forces a session that is "uninitialized" to be saved to the store. A session is uninitialized when it is new but not modified. Choosing false is useful for implementing login sessions, reducing server storage usage, or complying with laws that require permission before setting a cookie. Choosing false will also help with race conditions where a client makes multiple parallel requests without a session. */

// From official doc - https://github.com/jaredhanson/passport#middleware - To use Passport in an Express or Connect-based application, configure it with the required passport.initialize() middleware. If your application uses persistent login sessions (recommended, but not required), passport.session() middleware must also be used.
app.use(passport.initialize())

// Then start the passport session. The below code calls serializeUser and deserializeUser
app.use(passport.session())


passport.serializeUser((data) => {
    console.log(20);
})


app.get('/checksession', async (req, res) => {

    res.json(req.user || null);

})

/* These lines of code run on every request. They call functions in the passport/index.js called serializeUser and deserializeUser. serializeUser stores the user id to req.session.passport.user = {id:’..’}.

deserializeUser will check to see if this user is saved in the database, and if it is found it assigns it to the request as req.user = {user object}. */


/*The first line below means, I want /user browser url route to go to user.js route file. The second argument to app.use ('user' variable) means I am referring to './routes/user.js' file which I imported above.

The path to app.use() is a "mount" or "prefix" path and the purpose of which is to limit the middleware to only apply to any paths requested that begin with this prefixed path.

So, whatever path I am adding in < router.get('/', callback()) > in file in './routes/user' - that will only be added after the path, I am specifying here in this main server.js file. Means if in './routes/user.js' file I have the below

router.post('/logout', callback()) the route actually in the browser will be '/user/logout'

And thats why in ..src/components/navbar.js when I am doing axios.get I have to pass the actualt browser url which will be below

axios.post('/user/logout').then(cb())
*/

app.use('/user', user)


const path = require('path');
const { default: Axios } = require('axios');

app.use(express.static('./build'));
app.use(express.static('./images'));
app.use(express.static('./server/uploads'));
app.get('*', (req, res) => res.sendFile(path.resolve('build', 'index.html')));

app.listen(PORT, () => {
    console.log(`App listening on PORT: ${PORT} `)
})
var shuffleSequence = seq("intro", 
                          "intro_sep", 
                          sepWith("within_intro_sep", "practice"), 
                          "practice_sep", 
                          sepWith("sep", 
                            rshuffle(startsWith("condition"), 
                                    startsWith("filler"),
                            )), //
                          "send_results",
                          "debrief"); 
var practiceItemTypes = ["practice"];

// default settings
var manualSendResults = true;


var defaults = [ 
    "Separator", {
        // transfer: 1000,
        transfer: "keypress",
        hideProgressBar: true,
        normalMessage: "", 
        errorMessage: "Daha hızlı yanıtlayınız.",
        transfer: 600
    },
    "DashedAcceptabilityJudgment", {
        hideProgressBar: true,
        timeout: 5000,
        
        as: [["q","Evet (Q'ya basınız)"], ["p","Hayır (P'ye basınız)"]],
        q: "Bu cümle Türkçede kabul edilir bir cümle mi?",
        
        mode: "speeded acceptability",
        display: "in place",
        wordTime: 400,
        wordPauseTime: 100,
        instructions: " ",

        showNumbers: true,
        hasCorrect: false,
        autoFirstChar: false,
        showNumbers: false
    },
    "Question", {
        hideProgressBar: true,
        timeout: 10000,

        as: [["q","Doğru (Q'ya basınız)"], ["p","Yanlış (P'ye basınız)"]],
        instructions: "Cümleye göre bu ifade doğru mu, yanlış mı?",
        hasCorrect: false,
        randomOrder: false,
        autoFirstChar: false,
        showNumbers: false
    },
    "Message", {
        hideProgressBar: false
    },
    "Form", {
        hideProgressBar: true,
        continueOnReturn: true,
        saveReactionTime: true,
        continueMessage: "Devam etmek için buraya tıklayınız.",
        obligatoryCheckboxErrorGenerator: function (field) { return "Bu alanı doldurmanız gerekmektedir." },
        obligatoryErrorGenerator: function (field) { return "Bu alanı doldurmanız gerekmektedir."; },
        obligatoryRadioErrorGenerator: function (field) { return "Seçeneklerden birini seçiniz."; }
        
    }
];

function modifyRunningOrder(ro) {
        for (var i = 0; i < ro.length; ++i) {
            if ( (i != 0) && (i % 40 == 0)) {
                // Passing 'true' as the third argument casues the results from this controller to be omitted from the results file. 
                // (Though in fact, the Message controller does not add any results in any case.)
                ro[i].push(new DynamicElement(
                    "Message",
                    { html: "<p>Kısa bir ara. Bir sonraki cümleye geçmek için boşluk tuşuna basınız.</p>", transfer: "keypress"}, //, transfer: 1000 
                    true
                ));
            }
        }
        return ro;
    }


var items = [
    ["send_results", "__SendResults__", { }],


    ["sep", "Separator", {
        hideProgressBar: false,
        transfer: "keypress",
        normalMessage: "Bir sonraki cümleye geçmek için boşluk tuşuna basınız.",
        errorMessage:  "Bir sonraki cümleye geçmek için boşluk tuşuna basınız."}],

    ["intro_sep", "Separator", {
        hideProgressBar: false,
        transfer: "keypress",
        normalMessage: "Alıştırma kısmına başlamak için boşluk tuşuna basınız. (Unutmayın: Cümleye ve anlamına dair sezgilerinizle ilgileniyoruz, dolayısıyla hızlıca yanıt veriniz.)",
        errorMessage: "Alıştırma kısmına başlamak için boşluk tuşuna basınız. (Unutmayın: Cümleye ve anlamına dair sezgilerinizle ilgileniyoruz, dolayısıyla hızlıca yanıt veriniz.)" }],

    ["within_intro_sep", "Separator", {
        hideProgressBar: false,
        transfer: "keypress",
        normalMessage: "Bir sonraki cümleye geçmek için boşluk tuşuna basınız.",
        errorMessage: "Bir sonraki soruya geçmek için boşluk tuşuna basınız."}],

    ["practice_sep", "Separator", {
        hideProgressBar: false,
        transfer: "keypress",
        normalMessage: "Deneye başlamak için boşluk tuşuna basınız.",
        errorMessage: "Deneye başlamak için boşluk tuşuna basınız." }],

    ["intro", "Form", {
        html: { include: "intro1.html" },
        obligatoryCheckboxErrorGenerator: function (field) { return "Devam etmeden önce çalışmaya katılmayı kabul etmelisiniz."; }
    } ],
    
    ["intro", "Form", {
        html: { include: "intro2.html" },
        validators: {
            age: function (s) { if (s.match(/^\d+$/)) return true; else return "Yaşınızı sayı olarak giriniz."; },
        }
    } ],

    ["intro", "Form", {
        html: { include: "intro3.html" } } ],

    ["intro", "Form", {
        html: { include: "intro4.html" } } ],

    ["debrief", "Message", {
        html: { include: "debrief.html" },
                transfer: 3000  }],
                
["practice", "DashedAcceptabilityJudgment", { s: "Tuğrul hiç kimseye bir şey demeden bir buçuk saattir okulun bahçesine bekliyor." , hasCorrect: 1 } ],
["practice", "DashedAcceptabilityJudgment", { s: "Jülide hiçbir evin bahçesine yeşil sivri biber fidelerini dün sabah dikmemiş." , hasCorrect: 0 } ],
["practice", "DashedAcceptabilityJudgment", { s: "Simitçi ve midyeci zabıtanın geldiğini görünce koşarak uzaklaştı." , hasCorrect: 0 } ],
["practice", "DashedAcceptabilityJudgment", { s: "Futbolcu hakemin seyircilerin taşkınlık yapmasını gerekçe gösterince sinirlendiler." , hasCorrect: 1 } ],[["condition_a", 1], "DashedSentence", {s: "yöneticilerin aşçısı mutfakta sürekli zıpladılar"}],
[["condition_b", 1], "DashedSentence", {s: "yöneticilerin aşçısı mutfakta sürekli zıpladı"}],
[["condition_c", 1], "DashedSentence", {s: "yöneticinin aşçısı mutfakta sürekli zıpladılar"}],
[["condition_d", 1], "DashedSentence", {s: "yöneticinin aşçısı mutfakta sürekli zıpladı"}],
[["condition_a", 2], "DashedSentence", {s: "öğrencilerin ablası sınıfta birden bayıldılar"}],
[["condition_b", 2], "DashedSentence", {s: "öğrencilerin ablası sınıfta birden bayıldı"}],
[["condition_c", 2], "DashedSentence", {s: "öğrencinin ablası sınıfta birden bayıldılar"}],
[["condition_d", 2], "DashedSentence", {s: "öğrencinin ablası sınıfta birden bayıldı"}],
[["condition_a", 3], "DashedSentence", {s: "marangozların abisi atölyeden hızla uzaklaştılar"}],
[["condition_b", 3], "DashedSentence", {s: "marangozların abisi atölyeden hızla uzaklaştı"}],
[["condition_c", 3], "DashedSentence", {s: "marangozun abisi atölyeden hızla uzaklaştılar"}],
[["condition_d", 3], "DashedSentence", {s: "marangozun abisi atölyeden hızla uzaklaştı"}],
[["condition_a", 4], "DashedSentence", {s: "mahallelilerin emlakçısı aniden küstahça güldüler"}],
[["condition_b", 4], "DashedSentence", {s: "mahallelilerin emlakçısı aniden küstahça güldü"}],
[["condition_c", 4], "DashedSentence", {s: "mahallelinin emlakçısı aniden küstahça güldüler"}],
[["condition_d", 4], "DashedSentence", {s: "mahallelinin emlakçısı aniden küstahça güldü"}],
[["condition_a", 5], "DashedSentence", {s: "kızların halası sabaha kadar ağladılar"}],
[["condition_b", 5], "DashedSentence", {s: "kızların halası sabaha kadar ağladı"}],
[["condition_c", 5], "DashedSentence", {s: "kızın halası sabaha kadar ağladılar"}],
[["condition_d", 5], "DashedSentence", {s: "kızın halası sabaha kadar ağladı"}],
[["condition_a", 6], "DashedSentence", {s: "damatların dayısı arada sırada sıkıldılar"}],
[["condition_b", 6], "DashedSentence", {s: "damatların dayısı arada sırada sıkıldı"}],
[["condition_c", 6], "DashedSentence", {s: "damatın dayısı arada sırada sıkıldılar"}],
[["condition_d", 6], "DashedSentence", {s: "damatın dayısı arada sırada sıkıldı"}],
[["condition_a", 7], "DashedSentence", {s: "doktorların çiçekçisi günden güne zayıfladılar"}],
[["condition_b", 7], "DashedSentence", {s: "doktorların çiçekçisi günden güne zayıfladı"}],
[["condition_c", 7], "DashedSentence", {s: "doktorun çiçekçisi günden güne zayıfladılar"}],
[["condition_d", 7], "DashedSentence", {s: "doktorun çiçekçisi günden güne zayıfladı"}],
[["condition_a", 8], "DashedSentence", {s: "stajyerlerin eniştesi geceden önce uyudular"}],
[["condition_b", 8], "DashedSentence", {s: "stajyerlerin eniştesi geceden önce uyudu"}],
[["condition_c", 8], "DashedSentence", {s: "stajyerin eniştesi geceden önce uyudular"}],
[["condition_d", 8], "DashedSentence", {s: "stajyerin eniştesi geceden önce uyudu"}],
[["condition_a", 9], "DashedSentence", {s: "aristokratların hizmetçisi yorgun argın yattılar"}],
[["condition_b", 9], "DashedSentence", {s: "aristokratların hizmetçisi yorgun argın yattı"}],
[["condition_c", 9], "DashedSentence", {s: "aristokratın hizmetçisi yorgun argın yattılar"}],
[["condition_d", 9], "DashedSentence", {s: "aristokratın hizmetçisi yorgun argın yattı"}],
[["condition_a", 10], "DashedSentence", {s: "konuşmacıların sunucusu olağanüstü hızlı koştular"}],
[["condition_b", 10], "DashedSentence", {s: "konuşmacıların sunucusu olağanüstü hızlı koştu"}],
[["condition_c", 10], "DashedSentence", {s: "konuşmacının sunucusu olağanüstü hızlı koştular"}],
[["condition_d", 10], "DashedSentence", {s: "konuşmacının sunucusu olağanüstü hızlı koştu"}],
[["condition_a", 11], "DashedSentence", {s: "psikiyatristlerin eczacısı aç susuz dolaştılar"}],
[["condition_b", 11], "DashedSentence", {s: "psikiyatristlerin eczacısı aç susuz dolaştı"}],
[["condition_c", 11], "DashedSentence", {s: "psikiyatristin eczacısı aç susuz dolaştılar"}],
[["condition_d", 11], "DashedSentence", {s: "psikiyatristin eczacısı aç susuz dolaştı"}],
[["condition_a", 12], "DashedSentence", {s: "politikacıların hocası adliyeden çabucak çıktılar"}],
[["condition_b", 12], "DashedSentence", {s: "politikacıların hocası adliyeden çabucak çıktı"}],
[["condition_c", 12], "DashedSentence", {s: "politikacının hocası adliyeden çabucak çıktılar"}],
[["condition_d", 12], "DashedSentence", {s: "politikacının hocası adliyeden çabucak çıktı"}],
[["condition_a", 13], "DashedSentence", {s: "hakimlerin çaycısı nedensiz yere kızdılar"}],
[["condition_b", 13], "DashedSentence", {s: "hakimlerin çaycısı nedensiz yere kızdı"}],
[["condition_c", 13], "DashedSentence", {s: "hakimin çaycısı nedensiz yere kızdılar"}],
[["condition_d", 13], "DashedSentence", {s: "hakimin çaycısı nedensiz yere kızdı"}],
[["condition_a", 14], "DashedSentence", {s: "oyuncuların hemşiresi etrafta amaçsızca gezdiler"}],
[["condition_b", 14], "DashedSentence", {s: "oyuncuların hemşiresi etrafta amaçsızca gezdi"}],
[["condition_c", 14], "DashedSentence", {s: "oyuncunun hemşiresi etrafta amaçsızca gezdiler"}],
[["condition_d", 14], "DashedSentence", {s: "oyuncunun hemşiresi etrafta amaçsızca gezdi"}],
[["condition_a", 15], "DashedSentence", {s: "öğretmenlerin müdiresi biraz önce aradılar"}],
[["condition_b", 15], "DashedSentence", {s: "öğretmenlerin müdiresi biraz önce aradı"}],
[["condition_c", 15], "DashedSentence", {s: "öğretmenin müdiresi biraz önce aradılar"}],
[["condition_d", 15], "DashedSentence", {s: "öğretmenin müdiresi biraz önce aradı"}],
[["condition_a", 16], "DashedSentence", {s: "milyonerlerin terzisi tamamen gereksizce bağırdılar"}],
[["condition_b", 16], "DashedSentence", {s: "milyonerlerin terzisi tamamen gereksizce bağırdı"}],
[["condition_c", 16], "DashedSentence", {s: "milyonerin terzisi tamamen gereksizce bağırdılar"}],
[["condition_d", 16], "DashedSentence", {s: "milyonerin terzisi tamamen gereksizce bağırdı"}],
[["condition_a", 17], "DashedSentence", {s: "bebeklerin bakıcısı çok kibar davrandılar"}],
[["condition_b", 17], "DashedSentence", {s: "bebeklerin bakıcısı çok kibar davrandı"}],
[["condition_c", 17], "DashedSentence", {s: "bebeğin bakıcısı çok kibar davrandılar"}],
[["condition_d", 17], "DashedSentence", {s: "bebeğin bakıcısı çok kibar davrandı"}],
[["condition_a", 18], "DashedSentence", {s: "çocukların dadısı yüksek sesle konuştular"}],
[["condition_b", 18], "DashedSentence", {s: "çocukların dadısı yüksek sesle konuştu"}],
[["condition_c", 18], "DashedSentence", {s: "çocuğun dadısı yüksek sesle konuştular"}],
[["condition_d", 18], "DashedSentence", {s: "çocuğun dadısı yüksek sesle konuştu"}],
[["condition_a", 19], "DashedSentence", {s: "futbolcuların sürücüsü çok yavaş çalıştılar"}],
[["condition_b", 19], "DashedSentence", {s: "futbolcuların sürücüsü çok yavaş çalıştı"}],
[["condition_c", 19], "DashedSentence", {s: "futbolcunun sürücüsü çok yavaş çalıştılar"}],
[["condition_d", 19], "DashedSentence", {s: "futbolcunun sürücüsü çok yavaş çalıştı"}],
[["condition_a", 20], "DashedSentence", {s: "modacıların taksicisi saatlerce durmaksızın içtiler"}],
[["condition_b", 20], "DashedSentence", {s: "modacıların taksicisi saatlerce durmaksızın içti"}],
[["condition_c", 20], "DashedSentence", {s: "modacının taksicisi saatlerce durmaksızın içtiler"}],
[["condition_d", 20], "DashedSentence", {s: "modacının taksicisi saatlerce durmaksızın içti"}],
[["condition_a", 21], "DashedSentence", {s: "sanatçıların çalgıcısı feci bir şekilde öldüler"}],
[["condition_b", 21], "DashedSentence", {s: "sanatçıların çalgıcısı feci bir şekilde öldü"}],
[["condition_c", 21], "DashedSentence", {s: "sanatçının çalgıcısı feci bir şekilde öldüler"}],
[["condition_d", 21], "DashedSentence", {s: "sanatçının çalgıcısı feci bir şekilde öldü"}],
[["condition_a", 22], "DashedSentence", {s: "dedektiflerin dişçisi ilk kez çılgınca eğlendiler"}],
[["condition_b", 22], "DashedSentence", {s: "dedektiflerin dişçisi ilk kez çılgınca eğlendi"}],
[["condition_c", 22], "DashedSentence", {s: "dedektifin dişçisi ilk kez çılgınca eğlendiler"}],
[["condition_d", 22], "DashedSentence", {s: "dedektifin dişçisi ilk kez çılgınca eğlendi"}],
[["condition_a", 23], "DashedSentence", {s: "esnafların müşterisi şikayettten hemen sonra sustular"}],
[["condition_b", 23], "DashedSentence", {s: "esnafların müşterisi şikayettten hemen sonra sustu"}],
[["condition_c", 23], "DashedSentence", {s: "esnafın müşterisi şikayettten hemen sonra sustular"}],
[["condition_d", 23], "DashedSentence", {s: "esnafın müşterisi şikayettten hemen sonra sustu"}],
[["condition_a", 24], "DashedSentence", {s: "şarkıcıların koruması her zamanki gibi geciktiler"}],
[["condition_b", 24], "DashedSentence", {s: "şarkıcıların koruması her zamanki gibi gecikti"}],
[["condition_c", 24], "DashedSentence", {s: "şarkıcının koruması her zamanki gibi geciktiler"}],
[["condition_d", 24], "DashedSentence", {s: "şarkıcının koruması her zamanki gibi gecikti"}],
[["condition_a", 25], "DashedSentence", {s: "göstericilerin izleyicisi akşama kadar sessizce oturdular"}],
[["condition_b", 25], "DashedSentence", {s: "göstericilerin izleyicisi akşama kadar sessizce oturdu"}],
[["condition_c", 25], "DashedSentence", {s: "göstericinin izleyicisi akşama kadar sessizce oturdular"}],
[["condition_d", 25], "DashedSentence", {s: "göstericinin izleyicisi akşama kadar sessizce oturdu"}],
[["condition_a", 26], "DashedSentence", {s: "cerrahların hastası akşamki gösteriden önce kaçtılar"}],
[["condition_b", 26], "DashedSentence", {s: "cerrahların hastası akşamki gösteriden önce kaçtı"}],
[["condition_c", 26], "DashedSentence", {s: "cerrahın hastası akşamki gösteriden önce kaçtılar"}],
[["condition_d", 26], "DashedSentence", {s: "cerrahın hastası akşamki gösteriden önce kaçtı"}],
[["condition_a", 27], "DashedSentence", {s: "dalgıçların annesi bile bile geç kaldılar"}],
[["condition_b", 27], "DashedSentence", {s: "dalgıçların annesi bile bile geç kaldı"}],
[["condition_c", 27], "DashedSentence", {s: "dalgıcın annesi bile bile geç kaldılar"}],
[["condition_d", 27], "DashedSentence", {s: "dalgıcın annesi bile bile geç kaldı"}],
[["condition_a", 28], "DashedSentence", {s: "fabrikatörlerin işçisi beklenmedik bir anda hastalandılar"}],
[["condition_b", 28], "DashedSentence", {s: "fabrikatörlerin işçisi beklenmedik bir anda hastalandı"}],
[["condition_c", 28], "DashedSentence", {s: "fabrikatörün işçisi beklenmedik bir anda hastalandılar"}],
[["condition_d", 28], "DashedSentence", {s: "fabrikatörün işçisi beklenmedik bir anda hastalandı"}],
[["condition_a", 29], "DashedSentence", {s: "komedyenlerin yardımcısı poyrazdan dolayı üşüdüler"}],
[["condition_b", 29], "DashedSentence", {s: "komedyenlerin yardımcısı poyrazdan dolayı üşüdü"}],
[["condition_c", 29], "DashedSentence", {s: "komedyenin yardımcısı poyrazdan dolayı üşüdüler"}],
[["condition_d", 29], "DashedSentence", {s: "komedyenin yardımcısı poyrazdan dolayı üşüdü"}],
[["condition_a", 30], "DashedSentence", {s: "şoförlerin yolcusu yemekten sonra yine acıktılar"}],
[["condition_b", 30], "DashedSentence", {s: "şoförlerin yolcusu yemekten sonra yine acıktı"}],
[["condition_c", 30], "DashedSentence", {s: "şoförün yolcusu yemekten sonra yine acıktılar"}],
[["condition_d", 30], "DashedSentence", {s: "şoförün yolcusu yemekten sonra yine acıktı"}],
[["condition_a", 31], "DashedSentence", {s: "mühendislerin kapıcısı erken ödemeden dolayı sevindiler"}],
[["condition_b", 31], "DashedSentence", {s: "mühendislerin kapıcısı erken ödemeden dolayı sevindi"}],
[["condition_c", 31], "DashedSentence", {s: "mühendisin kapıcısı erken ödemeden dolayı sevindiler"}],
[["condition_d", 31], "DashedSentence", {s: "mühendisin kapıcısı erken ödemeden dolayı sevindi"}],
[["condition_a", 32], "DashedSentence", {s: "pazarcıların nakliyecisi mesaiden hemen sonra uzandılar"}],
[["condition_b", 32], "DashedSentence", {s: "pazarcıların nakliyecisi mesaiden hemen sonra uzandı"}],
[["condition_c", 32], "DashedSentence", {s: "pazarcının nakliyecisi mesaiden hemen sonra uzandılar"}],
[["condition_d", 32], "DashedSentence", {s: "pazarcının nakliyecisi mesaiden hemen sonra uzandı"}],
[["condition_a", 33], "DashedSentence", {s: "oyuncuların eğitimcisi ilk denemede epey zorlandılar"}],
[["condition_b", 33], "DashedSentence", {s: "oyuncuların eğitimcisi ilk denemede epey zorlandı"}],
[["condition_c", 33], "DashedSentence", {s: "oyuncunun eğitimcisi ilk denemede epey zorlandılar"}],
[["condition_d", 33], "DashedSentence", {s: "oyuncunun eğitimcisi ilk denemede epey zorlandı"}],
[["condition_a", 34], "DashedSentence", {s: "mankenlerin modacısı geç bir vakitte kalktılar"}],
[["condition_b", 34], "DashedSentence", {s: "mankenlerin modacısı geç bir vakitte kalktı"}],
[["condition_c", 34], "DashedSentence", {s: "mankenin modacısı geç bir vakitte kalktılar"}],
[["condition_d", 34], "DashedSentence", {s: "mankenin modacısı geç bir vakitte kalktı"}],
[["condition_a", 35], "DashedSentence", {s: "konukların teyzesi müthiş bir ağrıyla uyandılar"}],
[["condition_b", 35], "DashedSentence", {s: "konukların teyzesi müthiş bir ağrıyla uyandı"}],
[["condition_c", 35], "DashedSentence", {s: "konuğun teyzesi müthiş bir ağrıyla uyandılar"}],
[["condition_d", 35], "DashedSentence", {s: "konuğun teyzesi müthiş bir ağrıyla uyandı"}],
[["condition_a", 36], "DashedSentence", {s: "oğlanların amcası boş bir caddede yürüdüler"}],
[["condition_b", 36], "DashedSentence", {s: "oğlanların amcası boş bir caddede yürüdü"}],
[["condition_c", 36], "DashedSentence", {s: "oğlanın amcası boş bir caddede yürüdüler"}],
[["condition_d", 36], "DashedSentence", {s: "oğlanın amcası boş bir caddede yürüdü"}],
[["condition_a", 37], "DashedSentence", {s: "avukatların komşusu toplantıdan sonra birden sarardılar"}],
[["condition_b", 37], "DashedSentence", {s: "avukatların komşusu toplantıdan sonra birden sarardı"}],
[["condition_c", 37], "DashedSentence", {s: "avukatın komşusu toplantıdan sonra birden sarardılar"}],
[["condition_d", 37], "DashedSentence", {s: "avukatın komşusu toplantıdan sonra birden sarardı"}],
[["condition_a", 38], "DashedSentence", {s: "ünlülerin falcısı yabancı bir ülkede kayboldular"}],
[["condition_b", 38], "DashedSentence", {s: "ünlülerin falcısı yabancı bir ülkede kayboldu"}],
[["condition_c", 38], "DashedSentence", {s: "ünlünün falcısı yabancı bir ülkede kayboldular"}],
[["condition_d", 38], "DashedSentence", {s: "ünlünün falcısı yabancı bir ülkede kayboldu"}],
[["condition_a", 39], "DashedSentence", {s: "çiftçilerin bekçisi normalden çok yavaş gezindiler"}],
[["condition_b", 39], "DashedSentence", {s: "çiftçilerin bekçisi normalden çok yavaş gezindi"}],
[["condition_c", 39], "DashedSentence", {s: "çiftçinin bekçisi normalden çok yavaş gezindiler"}],
[["condition_d", 39], "DashedSentence", {s: "çiftçinin bekçisi normalden çok yavaş gezindi"}],
[["condition_a", 40], "DashedSentence", {s: "kadınların ninesi geçen seneye göre dinçleştiler"}],
[["condition_b", 40], "DashedSentence", {s: "kadınların ninesi geçen seneye göre dinçleşti"}],
[["condition_c", 40], "DashedSentence", {s: "kadının ninesi geçen seneye göre dinçleştiler"}],
[["condition_d", 40], "DashedSentence", {s: "kadının ninesi geçen seneye göre dinçleşti"}],
[["filler", 101], "DashedSentence", {s: "Adamın annesi fenalaşınca inek kurban ettiler"}],
[["filler", 102], "DashedSentence", {s: "Sosyologun öğrencisi konuşunca tutarsızlık açığa çıkardılar"}],
[["filler", 103], "DashedSentence", {s: "Doktorun hemşiresi gelene kadar hasta taburcu ettiler"}],
[["filler", 104], "DashedSentence", {s: "Kemancının sevgilisi ölünce mezar ziyaret ettiler"}],
[["filler", 105], "DashedSentence", {s: "Hocanın kapıcısı bayılınca doktor rahatsız ettiler"}],
[["filler", 106], "DashedSentence", {s: "Medyumun kocası saçmalayınca falcı zengin ettiler"}],
[["filler", 107], "DashedSentence", {s: "Başkanın dişçisi tırsınca stajyer kabul ettiler"}],
[["filler", 108], "DashedSentence", {s: "Eleştirmenin karısı kıvırtınca sapık tahrik ettiler"}],
[["filler", 109], "DashedSentence", {s: "Patronun kahyası düşünce düşman mutlu ettiler"}],
[["filler", 110], "DashedSentence", {s: "Müdürün aşçısı hazırlanınca yemek hazır ettiler"}],
[["filler", 111], "DashedSentence", {s: "Çocuğun abisi üzülünce oyuncak icat ettiler"}],
[["filler", 112], "DashedSentence", {s: "Psikologun hastası gecikince vakit hiç ettiler"}],
[["filler", 113], "DashedSentence", {s: "Ressamın tedarikçisi kaybolunca tuval ithal ettiler"}],
[["filler", 114], "DashedSentence", {s: "Dişçinin temizlikçisi yorulunca hademe ikna ettiler"}],
[["filler", 115], "DashedSentence", {s: "Kimyagerin kuryesi hapşurunca deney akıl ettiler"}],
[["filler", 116], "DashedSentence", {s: "Mankenin motorcusu sızınca çırak meşgul ettiler"}],
[["filler", 117], "DashedSentence", {s: "Dekanın davetlisi geçince seyirci ayağa kaldırdılar"}],
[["filler", 118], "DashedSentence", {s: "Mafyanın yatırımcısı batınca kuyumcu tehdit ettiler"}],
[["filler", 119], "DashedSentence", {s: "Aşçının manavı kapanınca et tedarik ettiler"}],
[["filler", 120], "DashedSentence", {s: "Öğrencinin hocası anlatınca makine icat ettiler"}],
[["filler", 121], "DashedSentence", {s: "Bakanın yardımcısı bulununca koltuk geri getirdi"}],
[["filler", 122], "DashedSentence", {s: "Öğrencinin hocası ayrılınca proje birden unuttu"}],
[["filler", 123], "DashedSentence", {s: "Pizzacının kuryesi tökezleyince soslar yere saçtı"}],
[["filler", 124], "DashedSentence", {s: "Kralın soytarısı asılınca şapka yerinde buldu"}],
[["filler", 125], "DashedSentence", {s: "Dekanın davetlisi hapşurunca çaylar aniden düşürdü"}],
[["filler", 126], "DashedSentence", {s: "Dedektifin gözlükçüsü evlenince hediyeler ağlanarak verdi"}],
[["filler", 127], "DashedSentence", {s: "Politikacının sözcüsü yakalanınca açıklama haliyle kesti"}],
[["filler", 128], "DashedSentence", {s: "Kadının temizlikçisi bayılınca deterjan tekrar saçtı"}],
[["filler", 129], "DashedSentence", {s: "Mankenin nişanlısı vurulunca haber hızlıca yaydı"}],
[["filler", 130], "DashedSentence", {s: "Çobanın sözlüsü tutuklanınca kamera sessizce söktü"}],
[["filler", 131], "DashedSentence", {s: "Dansözün kocası varınca kapı sakince açtı"}],
[["filler", 132], "DashedSentence", {s: "Çevirmenin kaynanası aramayınca metin keyfince bitirdi"}],
[["filler", 133], "DashedSentence", {s: "Fabrikatörün muhasebecisi kovulunca hesap tamamen karıştırdı"}],
[["filler", 134], "DashedSentence", {s: "Ünlünün kürkçüsü dönünce kumaş erkenden dikti"}],
[["filler", 135], "DashedSentence", {s: "Rektörün yardımcısı atanınca kütüphane gece kapattı"}],
[["filler", 136], "DashedSentence", {s: "Şarkıcının taksicisi gecikince trafik aniden kilitledi"}],
[["filler", 137], "DashedSentence", {s: "Çocuğun dadısı aramayınca bulaşık saatlerce yıkadı"}],
[["filler", 138], "DashedSentence", {s: "Çiftçinin tesisatçısı gelince borular güçlükle söktü"}],
[["filler", 139], "DashedSentence", {s: "Çiftin mobilyacısı kızınca koltuk sinirle parçaladı"}],
[["filler", 140], "DashedSentence", {s: "Adamın falcısı yanılınca fincan öfkeyle kırdı"}]


];
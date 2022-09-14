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
        wordTime: 500,
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
[["practice", 1], "DashedAcceptabilityJudgment", { s: "Tuğrul hiç kimseye bir şey demeden bir buçuk saattir okulun bahçesine bekliyor." , hasCorrect: 1 } ],
[["practice", 2], "DashedAcceptabilityJudgment", { s: "Jülide hiçbir evin bahçesine yeşil sivri biber fidelerini dün sabah dikmemiş." , hasCorrect: 0 } ],
[["practice", 3], "DashedAcceptabilityJudgment", { s: "Simitçi ve midyeci zabıtanın geldiğini görünce koşarak uzaklaştı." , hasCorrect: 0 } ],
[["practice", 4], "DashedAcceptabilityJudgment", { s: "Futbolcu hakemin seyircilerin taşkınlık yapmasını gerekçe gösterince sinirlendiler." , hasCorrect: 1 } ],
[["condition_a", 1], "DashedAcceptabilityJudgment", {s: "Yöneticilerin aşçısı mutfakta sürekli zıpladılar"  } ],
[["condition_b", 1], "DashedAcceptabilityJudgment", {s: "Yöneticilerin aşçısı mutfakta sürekli zıpladı"  } ],
[["condition_c", 1], "DashedAcceptabilityJudgment", {s: "Yöneticinin aşçısı mutfakta sürekli zıpladılar"  } ],
[["condition_d", 1], "DashedAcceptabilityJudgment", {s: "Yöneticinin aşçısı mutfakta sürekli zıpladı"  } ],
[["condition_a", 2], "DashedAcceptabilityJudgment", {s: "Öğrencilerin ablası sınıfta birden bayıldılar"  } ],
[["condition_b", 2], "DashedAcceptabilityJudgment", {s: "Öğrencilerin ablası sınıfta birden bayıldı"  } ],
[["condition_c", 2], "DashedAcceptabilityJudgment", {s: "Öğrencinin ablası sınıfta birden bayıldılar"  } ],
[["condition_d", 2], "DashedAcceptabilityJudgment", {s: "Öğrencinin ablası sınıfta birden bayıldı"  } ],
[["condition_a", 3], "DashedAcceptabilityJudgment", {s: "Marangozların abisi atölyeden hızla uzaklaştılar"  } ],
[["condition_b", 3], "DashedAcceptabilityJudgment", {s: "Marangozların abisi atölyeden hızla uzaklaştı"  } ],
[["condition_c", 3], "DashedAcceptabilityJudgment", {s: "Marangozun abisi atölyeden hızla uzaklaştılar"  } ],
[["condition_d", 3], "DashedAcceptabilityJudgment", {s: "Marangozun abisi atölyeden hızla uzaklaştı"  } ],
[["condition_a", 4], "DashedAcceptabilityJudgment", {s: "Mahallelilerin emlakçısı aniden küstahça güldüler"  } ],
[["condition_b", 4], "DashedAcceptabilityJudgment", {s: "Mahallelilerin emlakçısı aniden küstahça güldü"  } ],
[["condition_c", 4], "DashedAcceptabilityJudgment", {s: "Mahallelinin emlakçısı aniden küstahça güldüler"  } ],
[["condition_d", 4], "DashedAcceptabilityJudgment", {s: "Mahallelinin emlakçısı aniden küstahça güldü"  } ],
[["condition_a", 5], "DashedAcceptabilityJudgment", {s: "Kızların halası sabaha kadar ağladılar"  } ],
[["condition_b", 5], "DashedAcceptabilityJudgment", {s: "Kızların halası sabaha kadar ağladı"  } ],
[["condition_c", 5], "DashedAcceptabilityJudgment", {s: "Kızın halası sabaha kadar ağladılar"  } ],
[["condition_d", 5], "DashedAcceptabilityJudgment", {s: "Kızın halası sabaha kadar ağladı"  } ],
[["condition_a", 6], "DashedAcceptabilityJudgment", {s: "Damatların dayısı arada sırada sıkıldılar"  } ],
[["condition_b", 6], "DashedAcceptabilityJudgment", {s: "Damatların dayısı arada sırada sıkıldı"  } ],
[["condition_c", 6], "DashedAcceptabilityJudgment", {s: "Damatın dayısı arada sırada sıkıldılar"  } ],
[["condition_d", 6], "DashedAcceptabilityJudgment", {s: "Damatın dayısı arada sırada sıkıldı"  } ],
[["condition_a", 7], "DashedAcceptabilityJudgment", {s: "Doktorların çiçekçisi günden güne zayıfladılar"  } ],
[["condition_b", 7], "DashedAcceptabilityJudgment", {s: "Doktorların çiçekçisi günden güne zayıfladı"  } ],
[["condition_c", 7], "DashedAcceptabilityJudgment", {s: "Doktorun çiçekçisi günden güne zayıfladılar"  } ],
[["condition_d", 7], "DashedAcceptabilityJudgment", {s: "Doktorun çiçekçisi günden güne zayıfladı"  } ],
[["condition_a", 8], "DashedAcceptabilityJudgment", {s: "Stajyerlerin eniştesi geceden önce uyudular"  } ],
[["condition_b", 8], "DashedAcceptabilityJudgment", {s: "Stajyerlerin eniştesi geceden önce uyudu"  } ],
[["condition_c", 8], "DashedAcceptabilityJudgment", {s: "Stajyerin eniştesi geceden önce uyudular"  } ],
[["condition_d", 8], "DashedAcceptabilityJudgment", {s: "Stajyerin eniştesi geceden önce uyudu"  } ],
[["condition_a", 9], "DashedAcceptabilityJudgment", {s: "Aristokratların hizmetçisi yorgun argın yattılar"  } ],
[["condition_b", 9], "DashedAcceptabilityJudgment", {s: "Aristokratların hizmetçisi yorgun argın yattı"  } ],
[["condition_c", 9], "DashedAcceptabilityJudgment", {s: "Aristokratın hizmetçisi yorgun argın yattılar"  } ],
[["condition_d", 9], "DashedAcceptabilityJudgment", {s: "Aristokratın hizmetçisi yorgun argın yattı"  } ],
[["condition_a", 10], "DashedAcceptabilityJudgment", {s: "Konuşmacıların sunucusu olağanüstü hızlı koştular"  } ],
[["condition_b", 10], "DashedAcceptabilityJudgment", {s: "Konuşmacıların sunucusu olağanüstü hızlı koştu"  } ],
[["condition_c", 10], "DashedAcceptabilityJudgment", {s: "Konuşmacının sunucusu olağanüstü hızlı koştular"  } ],
[["condition_d", 10], "DashedAcceptabilityJudgment", {s: "Konuşmacının sunucusu olağanüstü hızlı koştu"  } ],
[["condition_a", 11], "DashedAcceptabilityJudgment", {s: "Psikiyatristlerin eczacısı aç susuz dolaştılar"  } ],
[["condition_b", 11], "DashedAcceptabilityJudgment", {s: "Psikiyatristlerin eczacısı aç susuz dolaştı"  } ],
[["condition_c", 11], "DashedAcceptabilityJudgment", {s: "Psikiyatristin eczacısı aç susuz dolaştılar"  } ],
[["condition_d", 11], "DashedAcceptabilityJudgment", {s: "Psikiyatristin eczacısı aç susuz dolaştı"  } ],
[["condition_a", 12], "DashedAcceptabilityJudgment", {s: "Politikacıların hocası adliyeden çabucak çıktılar"  } ],
[["condition_b", 12], "DashedAcceptabilityJudgment", {s: "Politikacıların hocası adliyeden çabucak çıktı"  } ],
[["condition_c", 12], "DashedAcceptabilityJudgment", {s: "Politikacının hocası adliyeden çabucak çıktılar"  } ],
[["condition_d", 12], "DashedAcceptabilityJudgment", {s: "Politikacının hocası adliyeden çabucak çıktı"  } ],
[["condition_a", 13], "DashedAcceptabilityJudgment", {s: "Hakimlerin çaycısı nedensiz yere kızdılar"  } ],
[["condition_b", 13], "DashedAcceptabilityJudgment", {s: "Hakimlerin çaycısı nedensiz yere kızdı"  } ],
[["condition_c", 13], "DashedAcceptabilityJudgment", {s: "Hakimin çaycısı nedensiz yere kızdılar"  } ],
[["condition_d", 13], "DashedAcceptabilityJudgment", {s: "Hakimin çaycısı nedensiz yere kızdı"  } ],
[["condition_a", 14], "DashedAcceptabilityJudgment", {s: "Oyuncuların hemşiresi etrafta amaçsızca gezdiler"  } ],
[["condition_b", 14], "DashedAcceptabilityJudgment", {s: "Oyuncuların hemşiresi etrafta amaçsızca gezdi"  } ],
[["condition_c", 14], "DashedAcceptabilityJudgment", {s: "Oyuncunun hemşiresi etrafta amaçsızca gezdiler"  } ],
[["condition_d", 14], "DashedAcceptabilityJudgment", {s: "Oyuncunun hemşiresi etrafta amaçsızca gezdi"  } ],
[["condition_a", 15], "DashedAcceptabilityJudgment", {s: "Öğretmenlerin müdiresi biraz önce aradılar"  } ],
[["condition_b", 15], "DashedAcceptabilityJudgment", {s: "Öğretmenlerin müdiresi biraz önce aradı"  } ],
[["condition_c", 15], "DashedAcceptabilityJudgment", {s: "Öğretmenin müdiresi biraz önce aradılar"  } ],
[["condition_d", 15], "DashedAcceptabilityJudgment", {s: "Öğretmenin müdiresi biraz önce aradı"  } ],
[["condition_a", 16], "DashedAcceptabilityJudgment", {s: "Milyonerlerin terzisi tamamen gereksizce bağırdılar"  } ],
[["condition_b", 16], "DashedAcceptabilityJudgment", {s: "Milyonerlerin terzisi tamamen gereksizce bağırdı"  } ],
[["condition_c", 16], "DashedAcceptabilityJudgment", {s: "Milyonerin terzisi tamamen gereksizce bağırdılar"  } ],
[["condition_d", 16], "DashedAcceptabilityJudgment", {s: "Milyonerin terzisi tamamen gereksizce bağırdı"  } ],
[["condition_a", 17], "DashedAcceptabilityJudgment", {s: "Bebeklerin bakıcısı çok kibar davrandılar"  } ],
[["condition_b", 17], "DashedAcceptabilityJudgment", {s: "Bebeklerin bakıcısı çok kibar davrandı"  } ],
[["condition_c", 17], "DashedAcceptabilityJudgment", {s: "Bebeğin bakıcısı çok kibar davrandılar"  } ],
[["condition_d", 17], "DashedAcceptabilityJudgment", {s: "Bebeğin bakıcısı çok kibar davrandı"  } ],
[["condition_a", 18], "DashedAcceptabilityJudgment", {s: "Çocukların dadısı yüksek sesle konuştular"  } ],
[["condition_b", 18], "DashedAcceptabilityJudgment", {s: "Çocukların dadısı yüksek sesle konuştu"  } ],
[["condition_c", 18], "DashedAcceptabilityJudgment", {s: "Çocuğun dadısı yüksek sesle konuştular"  } ],
[["condition_d", 18], "DashedAcceptabilityJudgment", {s: "Çocuğun dadısı yüksek sesle konuştu"  } ],
[["condition_a", 19], "DashedAcceptabilityJudgment", {s: "Futbolcuların sürücüsü çok yavaş çalıştılar"  } ],
[["condition_b", 19], "DashedAcceptabilityJudgment", {s: "Futbolcuların sürücüsü çok yavaş çalıştı"  } ],
[["condition_c", 19], "DashedAcceptabilityJudgment", {s: "Futbolcunun sürücüsü çok yavaş çalıştılar"  } ],
[["condition_d", 19], "DashedAcceptabilityJudgment", {s: "Futbolcunun sürücüsü çok yavaş çalıştı"  } ],
[["condition_a", 20], "DashedAcceptabilityJudgment", {s: "Modacıların taksicisi saatlerce durmaksızın içtiler"  } ],
[["condition_b", 20], "DashedAcceptabilityJudgment", {s: "Modacıların taksicisi saatlerce durmaksızın içti"  } ],
[["condition_c", 20], "DashedAcceptabilityJudgment", {s: "Modacının taksicisi saatlerce durmaksızın içtiler"  } ],
[["condition_d", 20], "DashedAcceptabilityJudgment", {s: "Modacının taksicisi saatlerce durmaksızın içti"  } ],
[["condition_a", 21], "DashedAcceptabilityJudgment", {s: "Sanatçıların çalgıcısı feci bir şekilde öldüler"  } ],
[["condition_b", 21], "DashedAcceptabilityJudgment", {s: "Sanatçıların çalgıcısı feci bir şekilde öldü"  } ],
[["condition_c", 21], "DashedAcceptabilityJudgment", {s: "Sanatçının çalgıcısı feci bir şekilde öldüler"  } ],
[["condition_d", 21], "DashedAcceptabilityJudgment", {s: "Sanatçının çalgıcısı feci bir şekilde öldü"  } ],
[["condition_a", 22], "DashedAcceptabilityJudgment", {s: "Dedektiflerin dişçisi ilk kez çılgınca eğlendiler"  } ],
[["condition_b", 22], "DashedAcceptabilityJudgment", {s: "Dedektiflerin dişçisi ilk kez çılgınca eğlendi"  } ],
[["condition_c", 22], "DashedAcceptabilityJudgment", {s: "Dedektifin dişçisi ilk kez çılgınca eğlendiler"  } ],
[["condition_d", 22], "DashedAcceptabilityJudgment", {s: "Dedektifin dişçisi ilk kez çılgınca eğlendi"  } ],
[["condition_a", 23], "DashedAcceptabilityJudgment", {s: "Esnafların müşterisi şikayettten hemen sonra sustular"  } ],
[["condition_b", 23], "DashedAcceptabilityJudgment", {s: "Esnafların müşterisi şikayettten hemen sonra sustu"  } ],
[["condition_c", 23], "DashedAcceptabilityJudgment", {s: "Esnafın müşterisi şikayettten hemen sonra sustular"  } ],
[["condition_d", 23], "DashedAcceptabilityJudgment", {s: "Esnafın müşterisi şikayettten hemen sonra sustu"  } ],
[["condition_a", 24], "DashedAcceptabilityJudgment", {s: "Şarkıcıların koruması her zamanki gibi geciktiler"  } ],
[["condition_b", 24], "DashedAcceptabilityJudgment", {s: "Şarkıcıların koruması her zamanki gibi gecikti"  } ],
[["condition_c", 24], "DashedAcceptabilityJudgment", {s: "Şarkıcının koruması her zamanki gibi geciktiler"  } ],
[["condition_d", 24], "DashedAcceptabilityJudgment", {s: "Şarkıcının koruması her zamanki gibi gecikti"  } ],
[["condition_a", 25], "DashedAcceptabilityJudgment", {s: "Göstericilerin izleyicisi akşama kadar sessizce oturdular"  } ],
[["condition_b", 25], "DashedAcceptabilityJudgment", {s: "Göstericilerin izleyicisi akşama kadar sessizce oturdu"  } ],
[["condition_c", 25], "DashedAcceptabilityJudgment", {s: "Göstericinin izleyicisi akşama kadar sessizce oturdular"  } ],
[["condition_d", 25], "DashedAcceptabilityJudgment", {s: "Göstericinin izleyicisi akşama kadar sessizce oturdu"  } ],
[["condition_a", 26], "DashedAcceptabilityJudgment", {s: "Cerrahların hastası akşamki gösteriden önce kaçtılar"  } ],
[["condition_b", 26], "DashedAcceptabilityJudgment", {s: "Cerrahların hastası akşamki gösteriden önce kaçtı"  } ],
[["condition_c", 26], "DashedAcceptabilityJudgment", {s: "Cerrahın hastası akşamki gösteriden önce kaçtılar"  } ],
[["condition_d", 26], "DashedAcceptabilityJudgment", {s: "Cerrahın hastası akşamki gösteriden önce kaçtı"  } ],
[["condition_a", 27], "DashedAcceptabilityJudgment", {s: "Dalgıçların annesi bile bile geç kaldılar"  } ],
[["condition_b", 27], "DashedAcceptabilityJudgment", {s: "Dalgıçların annesi bile bile geç kaldı"  } ],
[["condition_c", 27], "DashedAcceptabilityJudgment", {s: "Dalgıcın annesi bile bile geç kaldılar"  } ],
[["condition_d", 27], "DashedAcceptabilityJudgment", {s: "Dalgıcın annesi bile bile geç kaldı"  } ],
[["condition_a", 28], "DashedAcceptabilityJudgment", {s: "Fabrikatörlerin işçisi beklenmedik bir anda hastalandılar"  } ],
[["condition_b", 28], "DashedAcceptabilityJudgment", {s: "Fabrikatörlerin işçisi beklenmedik bir anda hastalandı"  } ],
[["condition_c", 28], "DashedAcceptabilityJudgment", {s: "Fabrikatörün işçisi beklenmedik bir anda hastalandılar"  } ],
[["condition_d", 28], "DashedAcceptabilityJudgment", {s: "Fabrikatörün işçisi beklenmedik bir anda hastalandı"  } ],
[["condition_a", 29], "DashedAcceptabilityJudgment", {s: "Komedyenlerin yardımcısı poyrazdan dolayı üşüdüler"  } ],
[["condition_b", 29], "DashedAcceptabilityJudgment", {s: "Komedyenlerin yardımcısı poyrazdan dolayı üşüdü"  } ],
[["condition_c", 29], "DashedAcceptabilityJudgment", {s: "Komedyenin yardımcısı poyrazdan dolayı üşüdüler"  } ],
[["condition_d", 29], "DashedAcceptabilityJudgment", {s: "Komedyenin yardımcısı poyrazdan dolayı üşüdü"  } ],
[["condition_a", 30], "DashedAcceptabilityJudgment", {s: "Şoförlerin yolcusu yemekten sonra yine acıktılar"  } ],
[["condition_b", 30], "DashedAcceptabilityJudgment", {s: "Şoförlerin yolcusu yemekten sonra yine acıktı"  } ],
[["condition_c", 30], "DashedAcceptabilityJudgment", {s: "Şoförün yolcusu yemekten sonra yine acıktılar"  } ],
[["condition_d", 30], "DashedAcceptabilityJudgment", {s: "Şoförün yolcusu yemekten sonra yine acıktı"  } ],
[["condition_a", 31], "DashedAcceptabilityJudgment", {s: "Mühendislerin kapıcısı erken ödemeden dolayı sevindiler"  } ],
[["condition_b", 31], "DashedAcceptabilityJudgment", {s: "Mühendislerin kapıcısı erken ödemeden dolayı sevindi"  } ],
[["condition_c", 31], "DashedAcceptabilityJudgment", {s: "Mühendisin kapıcısı erken ödemeden dolayı sevindiler"  } ],
[["condition_d", 31], "DashedAcceptabilityJudgment", {s: "Mühendisin kapıcısı erken ödemeden dolayı sevindi"  } ],
[["condition_a", 32], "DashedAcceptabilityJudgment", {s: "Pazarcıların nakliyecisi mesaiden hemen sonra uzandılar"  } ],
[["condition_b", 32], "DashedAcceptabilityJudgment", {s: "Pazarcıların nakliyecisi mesaiden hemen sonra uzandı"  } ],
[["condition_c", 32], "DashedAcceptabilityJudgment", {s: "Pazarcının nakliyecisi mesaiden hemen sonra uzandılar"  } ],
[["condition_d", 32], "DashedAcceptabilityJudgment", {s: "Pazarcının nakliyecisi mesaiden hemen sonra uzandı"  } ],
[["condition_a", 33], "DashedAcceptabilityJudgment", {s: "Oyuncuların eğitimcisi ilk denemede epey zorlandılar"  } ],
[["condition_b", 33], "DashedAcceptabilityJudgment", {s: "Oyuncuların eğitimcisi ilk denemede epey zorlandı"  } ],
[["condition_c", 33], "DashedAcceptabilityJudgment", {s: "Oyuncunun eğitimcisi ilk denemede epey zorlandılar"  } ],
[["condition_d", 33], "DashedAcceptabilityJudgment", {s: "Oyuncunun eğitimcisi ilk denemede epey zorlandı"  } ],
[["condition_a", 34], "DashedAcceptabilityJudgment", {s: "Mankenlerin modacısı geç bir vakitte kalktılar"  } ],
[["condition_b", 34], "DashedAcceptabilityJudgment", {s: "Mankenlerin modacısı geç bir vakitte kalktı"  } ],
[["condition_c", 34], "DashedAcceptabilityJudgment", {s: "Mankenin modacısı geç bir vakitte kalktılar"  } ],
[["condition_d", 34], "DashedAcceptabilityJudgment", {s: "Mankenin modacısı geç bir vakitte kalktı"  } ],
[["condition_a", 35], "DashedAcceptabilityJudgment", {s: "Konukların teyzesi müthiş bir ağrıyla uyandılar"  } ],
[["condition_b", 35], "DashedAcceptabilityJudgment", {s: "Konukların teyzesi müthiş bir ağrıyla uyandı"  } ],
[["condition_c", 35], "DashedAcceptabilityJudgment", {s: "Konuğun teyzesi müthiş bir ağrıyla uyandılar"  } ],
[["condition_d", 35], "DashedAcceptabilityJudgment", {s: "Konuğun teyzesi müthiş bir ağrıyla uyandı"  } ],
[["condition_a", 36], "DashedAcceptabilityJudgment", {s: "Oğlanların amcası boş bir caddede yürüdüler"  } ],
[["condition_b", 36], "DashedAcceptabilityJudgment", {s: "Oğlanların amcası boş bir caddede yürüdü"  } ],
[["condition_c", 36], "DashedAcceptabilityJudgment", {s: "Oğlanın amcası boş bir caddede yürüdüler"  } ],
[["condition_d", 36], "DashedAcceptabilityJudgment", {s: "Oğlanın amcası boş bir caddede yürüdü"  } ],
[["condition_a", 37], "DashedAcceptabilityJudgment", {s: "Avukatların komşusu toplantıdan sonra birden sarardılar"  } ],
[["condition_b", 37], "DashedAcceptabilityJudgment", {s: "Avukatların komşusu toplantıdan sonra birden sarardı"  } ],
[["condition_c", 37], "DashedAcceptabilityJudgment", {s: "Avukatın komşusu toplantıdan sonra birden sarardılar"  } ],
[["condition_d", 37], "DashedAcceptabilityJudgment", {s: "Avukatın komşusu toplantıdan sonra birden sarardı"  } ],
[["condition_a", 38], "DashedAcceptabilityJudgment", {s: "Ünlülerin falcısı yabancı bir ülkede kayboldular"  } ],
[["condition_b", 38], "DashedAcceptabilityJudgment", {s: "Ünlülerin falcısı yabancı bir ülkede kayboldu"  } ],
[["condition_c", 38], "DashedAcceptabilityJudgment", {s: "Ünlünün falcısı yabancı bir ülkede kayboldular"  } ],
[["condition_d", 38], "DashedAcceptabilityJudgment", {s: "Ünlünün falcısı yabancı bir ülkede kayboldu"  } ],
[["condition_a", 39], "DashedAcceptabilityJudgment", {s: "Çiftçilerin bekçisi normalden çok yavaş gezindiler"  } ],
[["condition_b", 39], "DashedAcceptabilityJudgment", {s: "Çiftçilerin bekçisi normalden çok yavaş gezindi"  } ],
[["condition_c", 39], "DashedAcceptabilityJudgment", {s: "Çiftçinin bekçisi normalden çok yavaş gezindiler"  } ],
[["condition_d", 39], "DashedAcceptabilityJudgment", {s: "Çiftçinin bekçisi normalden çok yavaş gezindi"  } ],
[["condition_a", 40], "DashedAcceptabilityJudgment", {s: "Kadınların ninesi geçen seneye göre dinçleştiler"  } ],
[["condition_b", 40], "DashedAcceptabilityJudgment", {s: "Kadınların ninesi geçen seneye göre dinçleşti"  } ],
[["condition_c", 40], "DashedAcceptabilityJudgment", {s: "Kadının ninesi geçen seneye göre dinçleştiler"  } ],
[["condition_d", 40], "DashedAcceptabilityJudgment", {s: "Kadının ninesi geçen seneye göre dinçleşti"  } ],
[["filler", 101], "DashedAcceptabilityJudgment", {s: "Adamın annesi fenalaşınca inek kurban ettiler"  } ],
[["filler", 102], "DashedAcceptabilityJudgment", {s: "Sosyologun öğrencisi konuşunca tutarsızlık açığa çıkardılar"  } ],
[["filler", 103], "DashedAcceptabilityJudgment", {s: "Doktorun hemşiresi gelene kadar hasta taburcu ettiler"  } ],
[["filler", 104], "DashedAcceptabilityJudgment", {s: "Kemancının sevgilisi ölünce mezar ziyaret ettiler"  } ],
[["filler", 105], "DashedAcceptabilityJudgment", {s: "Hocanın kapıcısı bayılınca doktor rahatsız ettiler"  } ],
[["filler", 106], "DashedAcceptabilityJudgment", {s: "Medyumun kocası saçmalayınca falcı zengin ettiler"  } ],
[["filler", 107], "DashedAcceptabilityJudgment", {s: "Başkanın dişçisi tırsınca stajyer kabul ettiler"  } ],
[["filler", 108], "DashedAcceptabilityJudgment", {s: "Eleştirmenin karısı kıvırtınca sapık tahrik ettiler"  } ],
[["filler", 109], "DashedAcceptabilityJudgment", {s: "Patronun kahyası düşünce düşman mutlu ettiler"  } ],
[["filler", 110], "DashedAcceptabilityJudgment", {s: "Müdürün aşçısı hazırlanınca yemek hazır ettiler"  } ],
[["filler", 111], "DashedAcceptabilityJudgment", {s: "Çocuğun abisi üzülünce oyuncak icat ettiler"  } ],
[["filler", 112], "DashedAcceptabilityJudgment", {s: "Psikologun hastası gecikince vakit hiç ettiler"  } ],
[["filler", 113], "DashedAcceptabilityJudgment", {s: "Ressamın tedarikçisi kaybolunca tuval ithal ettiler"  } ],
[["filler", 114], "DashedAcceptabilityJudgment", {s: "Dişçinin temizlikçisi yorulunca hademe ikna ettiler"  } ],
[["filler", 115], "DashedAcceptabilityJudgment", {s: "Kimyagerin kuryesi hapşurunca deney akıl ettiler"  } ],
[["filler", 116], "DashedAcceptabilityJudgment", {s: "Mankenin motorcusu sızınca çırak meşgul ettiler"  } ],
[["filler", 117], "DashedAcceptabilityJudgment", {s: "Dekanın davetlisi geçince seyirci ayağa kaldırdılar"  } ],
[["filler", 118], "DashedAcceptabilityJudgment", {s: "Mafyanın yatırımcısı batınca kuyumcu tehdit ettiler"  } ],
[["filler", 119], "DashedAcceptabilityJudgment", {s: "Aşçının manavı kapanınca et tedarik ettiler"  } ],
[["filler", 120], "DashedAcceptabilityJudgment", {s: "Öğrencinin hocası anlatınca makine icat ettiler"  } ],
[["filler", 121], "DashedAcceptabilityJudgment", {s: "Bakanın yardımcısı bulununca koltuk geri getirdi"  } ],
[["filler", 122], "DashedAcceptabilityJudgment", {s: "Öğrencinin hocası ayrılınca proje birden unuttu"  } ],
[["filler", 123], "DashedAcceptabilityJudgment", {s: "Pizzacının kuryesi tökezleyince soslar yere saçtı"  } ],
[["filler", 124], "DashedAcceptabilityJudgment", {s: "Kralın soytarısı asılınca şapka yerinde buldu"  } ],
[["filler", 125], "DashedAcceptabilityJudgment", {s: "Dekanın davetlisi hapşurunca çaylar aniden düşürdü"  } ],
[["filler", 126], "DashedAcceptabilityJudgment", {s: "Dedektifin gözlükçüsü evlenince hediyeler ağlanarak verdi"  } ],
[["filler", 127], "DashedAcceptabilityJudgment", {s: "Politikacının sözcüsü yakalanınca açıklama haliyle kesti"  } ],
[["filler", 128], "DashedAcceptabilityJudgment", {s: "Kadının temizlikçisi bayılınca deterjan tekrar saçtı"  } ],
[["filler", 129], "DashedAcceptabilityJudgment", {s: "Mankenin nişanlısı vurulunca haber hızlıca yaydı"  } ],
[["filler", 130], "DashedAcceptabilityJudgment", {s: "Çobanın sözlüsü tutuklanınca kamera sessizce söktü"  } ],
[["filler", 131], "DashedAcceptabilityJudgment", {s: "Dansözün kocası varınca kapı sakince açtı"  } ],
[["filler", 132], "DashedAcceptabilityJudgment", {s: "Çevirmenin kaynanası aramayınca metin keyfince bitirdi"  } ],
[["filler", 133], "DashedAcceptabilityJudgment", {s: "Fabrikatörün muhasebecisi kovulunca hesap tamamen karıştırdı"  } ],
[["filler", 134], "DashedAcceptabilityJudgment", {s: "Ünlünün kürkçüsü dönünce kumaş erkenden dikti"  } ],
[["filler", 135], "DashedAcceptabilityJudgment", {s: "Rektörün yardımcısı atanınca kütüphane gece kapattı"  } ],
[["filler", 136], "DashedAcceptabilityJudgment", {s: "Şarkıcının taksicisi gecikince trafik aniden kilitledi"  } ],
[["filler", 137], "DashedAcceptabilityJudgment", {s: "Çocuğun dadısı aramayınca bulaşık saatlerce yıkadı"  } ],
[["filler", 138], "DashedAcceptabilityJudgment", {s: "Çiftçinin tesisatçısı gelince borular güçlükle söktü"  } ],
[["filler", 139], "DashedAcceptabilityJudgment", {s: "Çiftin mobilyacısı kızınca koltuk sinirle parçaladı"  } ],
[["filler", 140], "DashedAcceptabilityJudgment", {s: "Adamın falcısı yanılınca fincan öfkeyle kırdı"}]
];
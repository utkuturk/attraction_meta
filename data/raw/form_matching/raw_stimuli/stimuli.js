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
        
        as: [["p","İYİ (P'ye basınız)"], ["q","KÖTÜ (Q'ya basınız)"]],
        q: "Bu cümle kulağınıza nasıl geliyor?",
        
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

        as: [["p","İYİ (P'ye basınız)"], ["q","KÖTÜ (Q'ya basınız)"]],
        instructions: "Bu cümle kulağınıza nasıl geliyor?",
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
        errorMessage: "Lütfen soruları okurken biraz daha dikkatli olalım."}],

    ["practice_sep", "Separator", {
        hideProgressBar: false,
        transfer: "keypress",
        normalMessage: "Deneye başlamak için boşluk tuşuna basınız.",
        errorMessage: "Lütfen soruları okurken biraz daha dikkatli olalım." }],

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
["practice", "DashedAcceptabilityJudgment", {s: "Bu kısım deneye ve sunum yöntemine alışmanız için bulunmaktadır." , hasCorrect: 0 } ],
["practice", "DashedAcceptabilityJudgment", {s: "Bu cümle öncekinden daha uzun bir cümle. Okuması biraz daha zor olsa da sunum şekli aslında aynı. Şimdi deneydekilere benzer cümleler görelim." , hasCorrect: 0 } ],
["practice", "DashedAcceptabilityJudgment", {s: "Öğrencinin asistanı gelince ders çok güzel anlattı." , hasCorrect: 1 } ],
["practice", "DashedAcceptabilityJudgment", {s: "Utku'nun kızı yürüyene kadar bir sürü oyuncak alınmıştı." , hasCorrect: 0 } ],
["practice", "DashedAcceptabilityJudgment", {s: "Kimsenin çocuğu ağlamayınca yeni yazılan kitap kimseye okumadı." , hasCorrect: 1 } ],
["practice", "DashedAcceptabilityJudgment", { s: "Tuğrul hiç kimseye bir şey demeden bir buçuk saattir okulun bahçesine bekliyor." , hasCorrect: 1 } ],
["practice", "DashedAcceptabilityJudgment", { s: "Jülide hiçbir evin bahçesine yeşil sivri biber fidelerini dün sabah dikmemiş." , hasCorrect: 0 } ],
["practice", "DashedAcceptabilityJudgment", { s: "Simitçi ve midyeci zabıtanın geldiğini görünce koşarak uzaklaştı." , hasCorrect: 0 } ],
["practice", "DashedAcceptabilityJudgment", { s: "Futbolcu hakemin seyircilerin taşkınlık yapmasını gerekçe gösterince sinirlendiler." , hasCorrect: 1 } ],
    
["practice", Message, {consentRequired: false, transfer: "keypress",
                     html: ["div",
                           ["p", "Elinizin ısındığını umuyorum. Hazır olduğunuzu hissettiğinizde 'boşluk' tuşuna basarak ilerleyiniz."],
                           ["p", "NOT: Vereceğiniz cevaplar üzerine çok düşünmeyin! Tamamlayacağınız deneyde 'doğru' ya da 'yanlış' cevap bulunmamaktadır. Deney boyunca deneye odaklanmanız gerekmektedir."]
                           ["p", "Katılımınız için çok teşekkürler!"],
                           ]}],
[["condition_a", 1], "DashedAcceptabilityJudgment", {s: "dövdükleri çocuk okula yorgun argın geldiler"}],
[["condition_b", 1], "DashedAcceptabilityJudgment", {s: "dövdükleri çocuk okula yorgun argın geldi"}],
[["condition_c", 1], "DashedAcceptabilityJudgment", {s: "dövdüğü çocuk okula yorgun argın geldiler"}],
[["condition_d", 1], "DashedAcceptabilityJudgment", {s: "dövdüğü çocuk okula yorgun argın geldi"}],
[["condition_a", 2], "DashedAcceptabilityJudgment", {s: "tuttukları aşçı mutfakta sürekli zıpladılar"}],
[["condition_b", 2], "DashedAcceptabilityJudgment", {s: "tuttukları aşçı mutfakta sürekli zıpladı"}],
[["condition_c", 2], "DashedAcceptabilityJudgment", {s: "tuttuğu aşçı mutfakta sürekli zıpladılar"}],
[["condition_d", 2], "DashedAcceptabilityJudgment", {s: "tuttuğu aşçı mutfakta sürekli zıpladı"}],
[["condition_a", 3], "DashedAcceptabilityJudgment", {s: "tanıdıkları müdür sınıfta birden bayıldılar"}],
[["condition_b", 3], "DashedAcceptabilityJudgment", {s: "tanıdıkları müdür sınıfta birden bayıldı"}],
[["condition_c", 3], "DashedAcceptabilityJudgment", {s: "tanıdığı müdür sınıfta birden bayıldılar"}],
[["condition_d", 3], "DashedAcceptabilityJudgment", {s: "tanıdığı müdür sınıfta birden bayıldı"}],
[["condition_a", 4], "DashedAcceptabilityJudgment", {s: "gördükleri marangoz atölyeden hızla uzaklaştılar"}],
[["condition_b", 4], "DashedAcceptabilityJudgment", {s: "gördükleri marangoz atölyeden hızla uzaklaştı"}],
[["condition_c", 4], "DashedAcceptabilityJudgment", {s: "gördüğü marangoz atölyeden hızla uzaklaştılar"}],
[["condition_d", 4], "DashedAcceptabilityJudgment", {s: "gördüğü marangoz atölyeden hızla uzaklaştı"}],
[["condition_a", 5], "DashedAcceptabilityJudgment", {s: "azarladıkları emlakçı aniden küstahça güldüler"}],
[["condition_b", 5], "DashedAcceptabilityJudgment", {s: "azarladıkları emlakçı aniden küstahça güldü"}],
[["condition_c", 5], "DashedAcceptabilityJudgment", {s: "azarladığı emlakçı aniden küstahça güldüler"}],
[["condition_d", 5], "DashedAcceptabilityJudgment", {s: "azarladığı emlakçı aniden küstahça güldü"}],
[["condition_a", 6], "DashedAcceptabilityJudgment", {s: "reddetikleri akademisyen sabaha kadar ağladılar"}],
[["condition_b", 6], "DashedAcceptabilityJudgment", {s: "reddetikleri akademisyen sabaha kadar ağladı"}],
[["condition_c", 6], "DashedAcceptabilityJudgment", {s: "reddettiği akademisyen sabaha kadar ağladılar"}],
[["condition_d", 6], "DashedAcceptabilityJudgment", {s: "reddettiği akademisyen sabaha kadar ağladı"}],
[["condition_a", 7], "DashedAcceptabilityJudgment", {s: "beklettikleri araştırmacı gün boyunca sıkıldılar"}],
[["condition_b", 7], "DashedAcceptabilityJudgment", {s: "beklettikleri araştırmacı gün boyunca sıkıldı"}],
[["condition_c", 7], "DashedAcceptabilityJudgment", {s: "beklettiği araştırmacı gün boyunca sıkıldılar"}],
[["condition_d", 7], "DashedAcceptabilityJudgment", {s: "beklettiği araştırmacı gün boyunca sıkıldı"}],
[["condition_a", 8], "DashedAcceptabilityJudgment", {s: "baktıkları hasta günden güne zayıfladılar"}],
[["condition_b", 8], "DashedAcceptabilityJudgment", {s: "baktıkları hasta günden güne zayıfladı"}],
[["condition_c", 8], "DashedAcceptabilityJudgment", {s: "baktığı hasta günden güne zayıfladılar"}],
[["condition_d", 8], "DashedAcceptabilityJudgment", {s: "baktığı hasta günden güne zayıfladı"}],
[["condition_a", 9], "DashedAcceptabilityJudgment", {s: "yordukları oyuncu onikiden önce uyudular"}],
[["condition_b", 9], "DashedAcceptabilityJudgment", {s: "yordukları oyuncu onikiden önce uyudu"}],
[["condition_c", 9], "DashedAcceptabilityJudgment", {s: "yorduğu oyuncu onikiden önce uyudular"}],
[["condition_d", 9], "DashedAcceptabilityJudgment", {s: "yorduğu oyuncu onikiden önce uyudu"}],
[["condition_a", 10], "DashedAcceptabilityJudgment", {s: "çalıştırdıkları hizmetçi yorgun argın yattılar"}],
[["condition_b", 10], "DashedAcceptabilityJudgment", {s: "çalıştırdıkları hizmetçi yorgun argın yattı"}],
[["condition_c", 10], "DashedAcceptabilityJudgment", {s: "çalıştırdığı hizmetçi yorgun argın yattılar"}],
[["condition_d", 10], "DashedAcceptabilityJudgment", {s: "çalıştırdığı hizmetçi yorgun argın yattı"}],
[["condition_a", 11], "DashedAcceptabilityJudgment", {s: "kovdukları sunucu olağanüstü bir hızla konuştular"}],
[["condition_b", 11], "DashedAcceptabilityJudgment", {s: "kovdukları sunucu olağanüstü bir hızla konuştu"}],
[["condition_c", 11], "DashedAcceptabilityJudgment", {s: "kovduğu sunucu olağanüstü bir hızla konuştular"}],
[["condition_d", 11], "DashedAcceptabilityJudgment", {s: "kovduğu sunucu olağanüstü bir hızla konuştu"}],
[["condition_a", 12], "DashedAcceptabilityJudgment", {s: "kaybettikleri turist aç susuz dolaştılar"}],
[["condition_b", 12], "DashedAcceptabilityJudgment", {s: "kaybettikleri turist aç susuz dolaştı"}],
[["condition_c", 12], "DashedAcceptabilityJudgment", {s: "kaybettiği turist aç susuz dolaştılar"}],
[["condition_d", 12], "DashedAcceptabilityJudgment", {s: "kaybettiği turist aç susuz dolaştı"}],
[["condition_a", 13], "DashedAcceptabilityJudgment", {s: "cezalandırdıkları hoca hapisten çabucak çıktılar"}],
[["condition_b", 13], "DashedAcceptabilityJudgment", {s: "cezalandırdıkları hoca hapisten çabucak çıktı"}],
[["condition_c", 13], "DashedAcceptabilityJudgment", {s: "cezalandırdığı hoca hapisten çabucak çıktılar"}],
[["condition_d", 13], "DashedAcceptabilityJudgment", {s: "cezalandırdığı hoca hapisten çabucak çıktı"}],
[["condition_a", 14], "DashedAcceptabilityJudgment", {s: "uyandırdıkları çaycı nedensiz yere kızdılar"}],
[["condition_b", 14], "DashedAcceptabilityJudgment", {s: "uyandırdıkları çaycı nedensiz yere kızdı"}],
[["condition_c", 14], "DashedAcceptabilityJudgment", {s: "uyandırdığı çaycı nedensiz yere kızdılar"}],
[["condition_d", 14], "DashedAcceptabilityJudgment", {s: "uyandırdığı çaycı nedensiz yere kızdı"}],
[["condition_a", 15], "DashedAcceptabilityJudgment", {s: "susturdukları hemşire etrafta amaçsızca gezdiler"}],
[["condition_b", 15], "DashedAcceptabilityJudgment", {s: "susturdukları hemşire etrafta amaçsızca gezdi"}],
[["condition_c", 15], "DashedAcceptabilityJudgment", {s: "susturduğu hemşire etrafta amaçsızca gezdiler"}],
[["condition_d", 15], "DashedAcceptabilityJudgment", {s: "susturduğu hemşire etrafta amaçsızca gezdi"}],
[["condition_a", 16], "DashedAcceptabilityJudgment", {s: "sordukları müdire biraz önce aradılar"}],
[["condition_b", 16], "DashedAcceptabilityJudgment", {s: "sordukları müdire biraz önce aradı"}],
[["condition_c", 16], "DashedAcceptabilityJudgment", {s: "sorduğu müdire biraz önce aradılar"}],
[["condition_d", 16], "DashedAcceptabilityJudgment", {s: "sorduğu müdire biraz önce aradı"}],
[["condition_a", 17], "DashedAcceptabilityJudgment", {s: "gönderdikleri terzi tamamen gereksizce bağırdılar"}],
[["condition_b", 17], "DashedAcceptabilityJudgment", {s: "gönderdikleri terzi tamamen gereksizce bağırdı"}],
[["condition_c", 17], "DashedAcceptabilityJudgment", {s: "gönderdiği terzi tamamen gereksizce bağırdılar"}],
[["condition_d", 17], "DashedAcceptabilityJudgment", {s: "gönderdiği terzi tamamen gereksizce bağırdı"}],
[["condition_a", 18], "DashedAcceptabilityJudgment", {s: "buldukları bakıcı çok kibar davrandılar"}],
[["condition_b", 18], "DashedAcceptabilityJudgment", {s: "buldukları bakıcı çok kibar davrandı"}],
[["condition_c", 18], "DashedAcceptabilityJudgment", {s: "bulduğu bakıcı çok kibar davrandılar"}],
[["condition_d", 18], "DashedAcceptabilityJudgment", {s: "bulduğu bakıcı çok kibar davrandı"}],
[["condition_a", 19], "DashedAcceptabilityJudgment", {s: "beğendikleri dadı sahil boyunca süzüldüler"}],
[["condition_b", 19], "DashedAcceptabilityJudgment", {s: "beğendikleri dadı sahil boyunca süzüldü"}],
[["condition_c", 19], "DashedAcceptabilityJudgment", {s: "beğendiği dadı sahil boyunca süzüldüler"}],
[["condition_d", 19], "DashedAcceptabilityJudgment", {s: "beğendiği dadı sahil boyunca süzüldü"}],
[["condition_a", 20], "DashedAcceptabilityJudgment", {s: "araştırdıkları tamirci çok yavaş çalıştılar"}],
[["condition_b", 20], "DashedAcceptabilityJudgment", {s: "araştırdıkları tamirci çok yavaş çalıştı"}],
[["condition_c", 20], "DashedAcceptabilityJudgment", {s: "araştırdığı tamirci çok yavaş çalıştılar"}],
[["condition_d", 20], "DashedAcceptabilityJudgment", {s: "araştırdığı tamirci çok yavaş çalıştı"}],
[["condition_a", 21], "DashedAcceptabilityJudgment", {s: "efkarlandırdıkları taksici saatlerce durmaksızın içtiler"}],
[["condition_b", 21], "DashedAcceptabilityJudgment", {s: "efkarlandırdıkları taksici saatlerce durmaksızın içti"}],
[["condition_c", 21], "DashedAcceptabilityJudgment", {s: "efkarlandırdığı taksici saatlerce durmaksızın içtiler"}],
[["condition_d", 21], "DashedAcceptabilityJudgment", {s: "efkarlandırdığı taksici saatlerce durmaksızın içti"}],
[["condition_a", 22], "DashedAcceptabilityJudgment", {s: "kovaladıkları çalgıcı feci bir şekilde öldüler"}],
[["condition_b", 22], "DashedAcceptabilityJudgment", {s: "kovaladıkları çalgıcı feci bir şekilde öldü"}],
[["condition_c", 22], "DashedAcceptabilityJudgment", {s: "kovaladığı çalgıcı feci bir şekilde öldüler"}],
[["condition_d", 22], "DashedAcceptabilityJudgment", {s: "kovaladığı çalgıcı feci bir şekilde öldü"}],
[["condition_a", 23], "DashedAcceptabilityJudgment", {s: "gittikleri dişçi ilk kez çılgınca eğlendiler"}],
[["condition_b", 23], "DashedAcceptabilityJudgment", {s: "gittikleri dişçi ilk kez çılgınca eğlendi"}],
[["condition_c", 23], "DashedAcceptabilityJudgment", {s: "gittiği dişçi ilk kez çılgınca eğlendiler"}],
[["condition_d", 23], "DashedAcceptabilityJudgment", {s: "gittiği dişçi ilk kez çılgınca eğlendi"}],
[["condition_a", 24], "DashedAcceptabilityJudgment", {s: "ağlattıkları müşteri şikayetinden hemen sonra sustular"}],
[["condition_b", 24], "DashedAcceptabilityJudgment", {s: "ağlattıkları müşteri şikayetinden hemen sonra sustu"}],
[["condition_c", 24], "DashedAcceptabilityJudgment", {s: "ağlattığı müşteri şikayetinden hemen sonra sustular"}],
[["condition_d", 24], "DashedAcceptabilityJudgment", {s: "ağlattığı müşteri şikayetinden hemen sonra sustu"}],
[["condition_a", 25], "DashedAcceptabilityJudgment", {s: "çıldırttıkları koruma her zamanki gibi geciktiler"}],
[["condition_b", 25], "DashedAcceptabilityJudgment", {s: "çıldırttıkları koruma her zamanki gibi gecikti"}],
[["condition_c", 25], "DashedAcceptabilityJudgment", {s: "çıldırttığı koruma her zamanki gibi geciktiler"}],
[["condition_d", 25], "DashedAcceptabilityJudgment", {s: "çıldırttığı koruma her zamanki gibi gecikti"}],
[["condition_a", 26], "DashedAcceptabilityJudgment", {s: "getirdikleri izleyici akşama kadar sessizce oturdular"}],
[["condition_b", 26], "DashedAcceptabilityJudgment", {s: "getirdikleri izleyici akşama kadar sessizce oturdu"}],
[["condition_c", 26], "DashedAcceptabilityJudgment", {s: "getirdiği izleyici akşama kadar sessizce oturdular"}],
[["condition_d", 26], "DashedAcceptabilityJudgment", {s: "getirdiği izleyici akşama kadar sessizce oturdu"}],
[["condition_a", 27], "DashedAcceptabilityJudgment", {s: "delirttikleri hasta akşamki muayeneden önce kaçtılar"}],
[["condition_b", 27], "DashedAcceptabilityJudgment", {s: "delirttikleri hasta akşamki muayeneden önce kaçtı"}],
[["condition_c", 27], "DashedAcceptabilityJudgment", {s: "delirttiği hasta akşamki muayeneden önce kaçtılar"}],
[["condition_d", 27], "DashedAcceptabilityJudgment", {s: "delirttiği hasta akşamki muayeneden önce kaçtı"}],
[["condition_a", 28], "DashedAcceptabilityJudgment", {s: "anlaştıkları terapist bile bile geç kaldılar"}],
[["condition_b", 28], "DashedAcceptabilityJudgment", {s: "anlaştıkları terapist bile bile geç kaldı"}],
[["condition_c", 28], "DashedAcceptabilityJudgment", {s: "anlaştığı terapist bile bile geç kaldılar"}],
[["condition_d", 28], "DashedAcceptabilityJudgment", {s: "anlaştığı terapist bile bile geç kaldı"}],
[["condition_a", 29], "DashedAcceptabilityJudgment", {s: "güvendikleri işçi beklenmedik bir anda hastalandılar"}],
[["condition_b", 29], "DashedAcceptabilityJudgment", {s: "güvendikleri işçi beklenmedik bir anda hastalandı"}],
[["condition_c", 29], "DashedAcceptabilityJudgment", {s: "güvendiği işçi beklenmedik bir anda hastalandılar"}],
[["condition_d", 29], "DashedAcceptabilityJudgment", {s: "güvendiği işçi beklenmedik bir anda hastalandı"}],
[["condition_a", 30], "DashedAcceptabilityJudgment", {s: "eğittikleri hostes sert rüzgarlardan dolayı üşüdüler"}],
[["condition_b", 30], "DashedAcceptabilityJudgment", {s: "eğittikleri hostes sert rüzgarlardan dolayı üşüdü"}],
[["condition_c", 30], "DashedAcceptabilityJudgment", {s: "eğittiği hostes sert rüzgarlardan dolayı üşüdüler"}],
[["condition_d", 30], "DashedAcceptabilityJudgment", {s: "eğittiği hostes sert rüzgarlardan dolayı üşüdü"}],
[["condition_a", 31], "DashedAcceptabilityJudgment", {s: "doyurdukları yolcu yemekten sonra yine acıktılar"}],
[["condition_b", 31], "DashedAcceptabilityJudgment", {s: "doyurdukları yolcu yemekten sonra yine acıktı"}],
[["condition_c", 31], "DashedAcceptabilityJudgment", {s: "doyurduğu yolcu yemekten sonra yine acıktılar"}],
[["condition_d", 31], "DashedAcceptabilityJudgment", {s: "doyurduğu yolcu yemekten sonra yine acıktı"}],
[["condition_a", 32], "DashedAcceptabilityJudgment", {s: "çağırdıkları kapıcı erken ödemeden dolayı sevindiler"}],
[["condition_b", 32], "DashedAcceptabilityJudgment", {s: "çağırdıkları kapıcı erken ödemeden dolayı sevindi"}],
[["condition_c", 32], "DashedAcceptabilityJudgment", {s: "çağırdığı kapıcı erken ödemeden dolayı sevindiler"}],
[["condition_d", 32], "DashedAcceptabilityJudgment", {s: "çağırdığı kapıcı erken ödemeden dolayı sevindi"}],
[["condition_a", 33], "DashedAcceptabilityJudgment", {s: "yordukları nakliyeci mesaiden hemen sonra uzandılar"}],
[["condition_b", 33], "DashedAcceptabilityJudgment", {s: "yordukları nakliyeci mesaiden hemen sonra uzandı"}],
[["condition_c", 33], "DashedAcceptabilityJudgment", {s: "yorduğu nakliyeci mesaiden hemen sonra uzandılar"}],
[["condition_d", 33], "DashedAcceptabilityJudgment", {s: "yorduğu nakliyeci mesaiden hemen sonra uzandı"}],
[["condition_a", 34], "DashedAcceptabilityJudgment", {s: "yetiştirdikleri eğitimci ilk denemede epey zorlandılar"}],
[["condition_b", 34], "DashedAcceptabilityJudgment", {s: "yetiştirdikleri eğitimci ilk denemede epey zorlandı"}],
[["condition_c", 34], "DashedAcceptabilityJudgment", {s: "yetiştirdiği eğitimci ilk denemede epey zorlandılar"}],
[["condition_d", 34], "DashedAcceptabilityJudgment", {s: "yetiştirdiği eğitimci ilk denemede epey zorlandı"}],
[["condition_a", 35], "DashedAcceptabilityJudgment", {s: "kiraladıkları animatör geç bir vakitte kalktılar"}],
[["condition_b", 35], "DashedAcceptabilityJudgment", {s: "kiraladıkları animatör geç bir vakitte kalktı"}],
[["condition_c", 35], "DashedAcceptabilityJudgment", {s: "kiraladığı animatör geç bir vakitte kalktılar"}],
[["condition_d", 35], "DashedAcceptabilityJudgment", {s: "kiraladığı animatör geç bir vakitte kalktı"}],
[["condition_a", 36], "DashedAcceptabilityJudgment", {s: "yaraladıkları polis müthiş bir ağrıyla uyandılar"}],
[["condition_b", 36], "DashedAcceptabilityJudgment", {s: "yaraladıkları polis müthiş bir ağrıyla uyandı"}],
[["condition_c", 36], "DashedAcceptabilityJudgment", {s: "yaraladığı polis müthiş bir ağrıyla uyandılar"}],
[["condition_d", 36], "DashedAcceptabilityJudgment", {s: "yaraladığı polis müthiş bir ağrıyla uyandı"}],
[["condition_a", 37], "DashedAcceptabilityJudgment", {s: "kaçırdıkları hırsız boş bir caddede yürüdüler"}],
[["condition_b", 37], "DashedAcceptabilityJudgment", {s: "kaçırdıkları hırsız boş bir caddede yürüdü"}],
[["condition_c", 37], "DashedAcceptabilityJudgment", {s: "kaçırdığı hırsız boş bir caddede yürüdüler"}],
[["condition_d", 37], "DashedAcceptabilityJudgment", {s: "kaçırdığı hırsız boş bir caddede yürüdü"}],
[["condition_a", 38], "DashedAcceptabilityJudgment", {s: "zehirledikleri kral toplantıdan sonra birden sarardılar"}],
[["condition_b", 38], "DashedAcceptabilityJudgment", {s: "zehirledikleri kral toplantıdan sonra birden sarardı"}],
[["condition_c", 38], "DashedAcceptabilityJudgment", {s: "zehirlediği kral toplantıdan sonra birden sarardılar"}],
[["condition_d", 38], "DashedAcceptabilityJudgment", {s: "zehirlediği kral toplantıdan sonra birden sarardı"}],
[["condition_a", 39], "DashedAcceptabilityJudgment", {s: "gezdirdikleri falcı yabancı bir ülkede kayboldular"}],
[["condition_b", 39], "DashedAcceptabilityJudgment", {s: "gezdirdikleri falcı yabancı bir ülkede kayboldu"}],
[["condition_c", 39], "DashedAcceptabilityJudgment", {s: "gezdirdiği falcı yabancı bir ülkede kayboldular"}],
[["condition_d", 39], "DashedAcceptabilityJudgment", {s: "gezdirdiği falcı yabancı bir ülkede kayboldu"}],
[["condition_a", 40], "DashedAcceptabilityJudgment", {s: "şüphelendirdikleri bekçi normalden çok yavaş gezindiler"}],
[["condition_b", 40], "DashedAcceptabilityJudgment", {s: "şüphelendirdikleri bekçi normalden çok yavaş gezindi"}],
[["condition_c", 40], "DashedAcceptabilityJudgment", {s: "şüphelendirdiği bekçi normalden çok yavaş gezindiler"}],
[["condition_d", 40], "DashedAcceptabilityJudgment", {s: "şüphelendirdiği bekçi normalden çok yavaş gezindi"}],
[["filler", 121], "DashedAcceptabilityJudgment", {s: "okuttukları öğrenci başarılı olunca mutlu oldular"}],
[["filler", 122], "DashedAcceptabilityJudgment", {s: "biriktirdikleri para dün kaybolunca çılgına döndüler"}],
[["filler", 123], "DashedAcceptabilityJudgment", {s: "düşündükleri teknisyen hızlı çalıştığından tekrar çağırdılar"}],
[["filler", 124], "DashedAcceptabilityJudgment", {s: "hazırladıkları yemek yere dökülünce yenisini yaptılar"}],
[["filler", 125], "DashedAcceptabilityJudgment", {s: "başladıkları film kötü çıkınca dizi izlediler"}],
[["filler", 126], "DashedAcceptabilityJudgment", {s: "diktikleri ağaç meyve verince epey şaşırdılar"}],
[["filler", 127], "DashedAcceptabilityJudgment", {s: "sevdikleri öğretmen emekli olunca saatlerce ağlamışlar"}],
[["filler", 128], "DashedAcceptabilityJudgment", {s: "kullandıkları ilaç rahatsız edince doktorla konuşmuşlar"}],
[["filler", 129], "DashedAcceptabilityJudgment", {s: "söyledikleri yemek soğuk gelince geri gönderdiler"}],
[["filler", 130], "DashedAcceptabilityJudgment", {s: "ayıpladıkları kadın onları duyunca biraz gerildiler"}],
[["filler", 131], "DashedAcceptabilityJudgment", {s: "bahsettikleri ünlü kafeye gelince şok olmuşlar"}],
[["filler", 132], "DashedAcceptabilityJudgment", {s: "bindikleri araba sorun çıkarınca hemen indiler"}],
[["filler", 133], "DashedAcceptabilityJudgment", {s: "okudukları şiir seyirciler tarafından beğenilmeyince üzüldüler"}],
[["filler", 134], "DashedAcceptabilityJudgment", {s: "dinledikleri şarkıcı yanlarına gelince aşırı heyecanlandılar"}],
[["filler", 135], "DashedAcceptabilityJudgment", {s: "kaçtıkları katil durunca rahat bir nefes aldılar"}],
[["filler", 136], "DashedAcceptabilityJudgment", {s: "karşılaştıkları çocuk kaybolduğu için oldukça endişelenmişler"}],
[["filler", 137], "DashedAcceptabilityJudgment", {s: "aldıkları elma kurtlandığı için atmak zorunda kaldılar"}],
[["filler", 138], "DashedAcceptabilityJudgment", {s: "kırdıkları tabak kolayca yapıştırılınca yenisini almadılar"}],
[["filler", 139], "DashedAcceptabilityJudgment", {s: "yaptıkları heykel yağmurda ıslanınca kurulamaya giriştiler"}],
[["filler", 140], "DashedAcceptabilityJudgment", {s: "gıdıkladıkları bebek üstlerine kusunca banyoya koştular"}],
[["filler", 101], "DashedAcceptabilityJudgment", {s: "kızdığı bakan bulununca koltuk geri getirdi"}],
[["filler", 102], "DashedAcceptabilityJudgment", {s: "aradığı asistan ayrılınca proje birden unuttu"}],
[["filler", 103], "DashedAcceptabilityJudgment", {s: "beklediği kurye tökezleyince soslar yere saçtı"}],
[["filler", 104], "DashedAcceptabilityJudgment", {s: "güldüğü soytarı asılınca şapka yerinde buldu"}],
[["filler", 105], "DashedAcceptabilityJudgment", {s: "yazıştığı dekan hapşurunca çaylar aniden düşürdü"}],
[["filler", 106], "DashedAcceptabilityJudgment", {s: "bildiği gözlükçü evlenince hediyeler ağlanarak verdi"}],
[["filler", 107], "DashedAcceptabilityJudgment", {s: "savunduğu politikacı yakalanınca açıklama haliyle kesti"}],
[["filler", 108], "DashedAcceptabilityJudgment", {s: "ağırladığı temizlikçi bayılınca deterjan tekrar saçtı"}],
[["filler", 109], "DashedAcceptabilityJudgment", {s: "düşlediği manken nişanlanınca haber hızlıca yaydı"}],
[["filler", 110], "DashedAcceptabilityJudgment", {s: "sözleştiği fabrikatör vurulunca kamera sessizce söktü"}],
[["filler", 111], "DashedAcceptabilityJudgment", {s: "istediği dansöz varınca kapı sakince açtı"}],
[["filler", 112], "DashedAcceptabilityJudgment", {s: "haberleştiği çevirmen aramayınca metin keyfince bitirdi"}],
[["filler", 113], "DashedAcceptabilityJudgment", {s: "bağırdığı muhasebeci kovulunca hesap tamamen karıştırdı"}],
[["filler", 114], "DashedAcceptabilityJudgment", {s: "buluştuğu kürkçü dönünce kumaş erkenden dikti"}],
[["filler", 115], "DashedAcceptabilityJudgment", {s: "seçtiği rektör atanınca kütüphane gece kapattı"}],
[["filler", 116], "DashedAcceptabilityJudgment", {s: "görüştüğü şoför gecikince trafik aniden kilitledi"}],
[["filler", 117], "DashedAcceptabilityJudgment", {s: "kandırdığı adam ödemeyince bulaşık saatlerce yıkadı"}],
[["filler", 118], "DashedAcceptabilityJudgment", {s: "mesajlaştığı tesisatçı gelince borular güçlükle söktü"}],
[["filler", 119], "DashedAcceptabilityJudgment", {s: "üzdüğü mobilyacı kızınca koltuk sinirle parçaladı"}],
[["filler", 120], "DashedAcceptabilityJudgment", {s: "tanıştığı medyum yanılınca fincan öfkeyle kırdı"}]


];
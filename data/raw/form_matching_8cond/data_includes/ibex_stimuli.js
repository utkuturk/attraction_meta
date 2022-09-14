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

    ["intro", "Form", {
        html: { include: "intro5.html" } } ],
    
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
    

[["condition_rc_a", 1], "DashedAcceptabilityJudgment", {s: "Dövdükleri çocuk okula yorgun argın geldiler."}],
[["condition_rc_b", 1], "DashedAcceptabilityJudgment", {s: "Dövdükleri çocuk okula yorgun argın geldi."}],
[["condition_rc_c", 1], "DashedAcceptabilityJudgment", {s: "Dövdüğü çocuk okula yorgun argın geldiler."}],
[["condition_rc_d", 1], "DashedAcceptabilityJudgment", {s: "Dövdüğü çocuk okula yorgun argın geldi."}],
[["condition_gen_a", 1], "DashedAcceptabilityJudgment", {s: "Muhtarların çocuğu okula yorgun argın geldiler."}],
[["condition_gen_b", 1], "DashedAcceptabilityJudgment", {s: "Muhtarların çocuğu okula yorgun argın geldi."}],
[["condition_gen_c", 1], "DashedAcceptabilityJudgment", {s: "Muhtarın çocuğu okula yorgun argın geldiler."}],
[["condition_gen_d", 1], "DashedAcceptabilityJudgment", {s: "Muhtarın çocuğu okula yorgun argın geldi."}],

[["condition_rc_a", 2], "DashedAcceptabilityJudgment", {s: "Tuttukları aşçı mutfakta sürekli zıpladılar."}],
[["condition_rc_b", 2], "DashedAcceptabilityJudgment", {s: "Tuttukları aşçı mutfakta sürekli zıpladı."}],
[["condition_rc_c", 2], "DashedAcceptabilityJudgment", {s: "Tuttuğu aşçı mutfakta sürekli zıpladılar."}],
[["condition_rc_d", 2], "DashedAcceptabilityJudgment", {s: "Tuttuğu aşçı mutfakta sürekli zıpladı."}],
[["condition_gen_a", 2], "DashedAcceptabilityJudgment", {s: "Yöneticilerin aşçısı mutfakta sürekli zıpladılar."  } ],
[["condition_gen_b", 2], "DashedAcceptabilityJudgment", {s: "Yöneticilerin aşçısı mutfakta sürekli zıpladı."  } ],
[["condition_gen_c", 2], "DashedAcceptabilityJudgment", {s: "Yöneticinin aşçısı mutfakta sürekli zıpladılar."  } ],
[["condition_gen_d", 2], "DashedAcceptabilityJudgment", {s: "Yöneticinin aşçısı mutfakta sürekli zıpladı."  } ],

[["condition_rc_a", 3], "DashedAcceptabilityJudgment", {s: "Tanıdıkları müdür sınıfta birden bayıldılar."}],
[["condition_rc_b", 3], "DashedAcceptabilityJudgment", {s: "Tanıdıkları müdür sınıfta birden bayıldı."}],
[["condition_rc_c", 3], "DashedAcceptabilityJudgment", {s: "Tanıdığı müdür sınıfta birden bayıldılar."}],
[["condition_rc_d", 3], "DashedAcceptabilityJudgment", {s: "Tanıdığı müdür sınıfta birden bayıldı."}],
[["condition_gen_a", 3], "DashedAcceptabilityJudgment", {s: "Öğretmenlerin müdürü sınıfta birden bayıldılar."  } ],
[["condition_gen_b", 3], "DashedAcceptabilityJudgment", {s: "Öğretmenlerin müdürü sınıfta birden bayıldı."  } ],
[["condition_gen_c", 3], "DashedAcceptabilityJudgment", {s: "Öğretmenin müdürü sınıfta birden bayıldılar."  } ],
[["condition_gen_d", 3], "DashedAcceptabilityJudgment", {s: "Öğretmenin müdürü sınıfta birden bayıldı."  } ],

[["condition_rc_a", 4], "DashedAcceptabilityJudgment", {s: "Gördükleri marangoz atölyeden hızla uzaklaştılar."}],
[["condition_rc_b", 4], "DashedAcceptabilityJudgment", {s: "Gördükleri marangoz atölyeden hızla uzaklaştı."}],
[["condition_rc_c", 4], "DashedAcceptabilityJudgment", {s: "Gördüğü marangoz atölyeden hızla uzaklaştılar."}],
[["condition_rc_d", 4], "DashedAcceptabilityJudgment", {s: "Gördüğü marangoz atölyeden hızla uzaklaştı."}],
[["condition_gen_a", 4], "DashedAcceptabilityJudgment", {s: "Mobilyacıların marangozu atölyeden hızla uzaklaştılar."  } ],
[["condition_gen_b", 4], "DashedAcceptabilityJudgment", {s: "Mobilyacıların marangozu atölyeden hızla uzaklaştı."  } ],
[["condition_gen_c", 4], "DashedAcceptabilityJudgment", {s: "Mobilyacının marangozu atölyeden hızla uzaklaştılar."  } ],
[["condition_gen_d", 4], "DashedAcceptabilityJudgment", {s: "Mobilyacının marangozu atölyeden hızla uzaklaştı."  } ],

[["condition_rc_a", 5], "DashedAcceptabilityJudgment", {s: "Azarladıkları emlakçı aniden küstahça güldüler."}],
[["condition_rc_b", 5], "DashedAcceptabilityJudgment", {s: "Azarladıkları emlakçı aniden küstahça güldü."}],
[["condition_rc_c", 5], "DashedAcceptabilityJudgment", {s: "Azarladığı emlakçı aniden küstahça güldüler."}],
[["condition_rc_d", 5], "DashedAcceptabilityJudgment", {s: "Azarladığı emlakçı aniden küstahça güldü."}],
[["condition_gen_a", 5], "DashedAcceptabilityJudgment", {s: "Mahallelilerin emlakçısı aniden küstahça güldüler."  } ],
[["condition_gen_b", 5], "DashedAcceptabilityJudgment", {s: "Mahallelilerin emlakçısı aniden küstahça güldü."  } ],
[["condition_gen_c", 5], "DashedAcceptabilityJudgment", {s: "Mahallelinin emlakçısı aniden küstahça güldüler."  } ],
[["condition_gen_d", 5], "DashedAcceptabilityJudgment", {s: "Mahallelinin emlakçısı aniden küstahça güldü."  } ],

[["condition_rc_a", 6], "DashedAcceptabilityJudgment", {s: "Reddetikleri akademisyen sabaha kadar ağladılar."}],
[["condition_rc_b", 6], "DashedAcceptabilityJudgment", {s: "Reddetikleri akademisyen sabaha kadar ağladı."}],
[["condition_rc_c", 6], "DashedAcceptabilityJudgment", {s: "Reddettiği akademisyen sabaha kadar ağladılar."}],
[["condition_rc_d", 6], "DashedAcceptabilityJudgment", {s: "Reddettiği akademisyen sabaha kadar ağladı."}],
[["condition_gen_a", 6], "DashedAcceptabilityJudgment", {s: "Hükümetlerin akademisyeni sabaha olana kadar ağladılar."  } ],
[["condition_gen_b", 6], "DashedAcceptabilityJudgment", {s: "Hükümetlerin akademisyeni sabaha olana kadar ağladı."  } ],
[["condition_gen_c", 6], "DashedAcceptabilityJudgment", {s: "Hükümetin akademisyeni sabaha olana kadar ağladılar."  } ],
[["condition_gen_d", 6], "DashedAcceptabilityJudgment", {s: "Hükümetin akademisyeni sabaha olana kadar ağladı."  } ],

[["condition_rc_a", 7], "DashedAcceptabilityJudgment", {s: "Beklettikleri araştırmacı gün boyunca sıkıldılar."}],
[["condition_rc_b", 7], "DashedAcceptabilityJudgment", {s: "Beklettikleri araştırmacı gün boyunca sıkıldı."}],
[["condition_rc_c", 7], "DashedAcceptabilityJudgment", {s: "Beklettiği araştırmacı gün boyunca sıkıldılar."}],
[["condition_rc_d", 7], "DashedAcceptabilityJudgment", {s: "Beklettiği araştırmacı gün boyunca sıkıldı."}],
[["condition_gen_a", 7], "DashedAcceptabilityJudgment", {s: "Projelerin araştırmacısı arada sırada sıkıldılar."  } ],
[["condition_gen_b", 7], "DashedAcceptabilityJudgment", {s: "Projelerin araştırmacısı arada sırada sıkıldı."  } ],
[["condition_gen_c", 7], "DashedAcceptabilityJudgment", {s: "Projenin araştırmacısı arada sırada sıkıldılar."  } ],
[["condition_gen_d", 7], "DashedAcceptabilityJudgment", {s: "Projenin araştırmacısı arada sırada sıkıldı."  } ],

[["condition_rc_a", 8], "DashedAcceptabilityJudgment", {s: "Baktıkları hasta günden güne zayıfladılar."}],
[["condition_rc_b", 8], "DashedAcceptabilityJudgment", {s: "Baktıkları hasta günden güne zayıfladı."}],
[["condition_rc_c", 8], "DashedAcceptabilityJudgment", {s: "Baktığı hasta günden güne zayıfladılar."}],
[["condition_rc_d", 8], "DashedAcceptabilityJudgment", {s: "Baktığı hasta günden güne zayıfladı."}],
[["condition_gen_a", 8], "DashedAcceptabilityJudgment", {s: "Doktorların hastası günden güne durmadan zayıfladılar."  } ],
[["condition_gen_b", 8], "DashedAcceptabilityJudgment", {s: "Doktorların hastası günden güne durmadan zayıfladı."  } ],
[["condition_gen_c", 8], "DashedAcceptabilityJudgment", {s: "Doktorun hastası günden güne durmadan zayıfladılar."  } ],
[["condition_gen_d", 8], "DashedAcceptabilityJudgment", {s: "Doktorun hastası günden güne durmadan zayıfladı."  } ],

[["condition_rc_a", 9], "DashedAcceptabilityJudgment", {s: "Yordukları oyuncu onikiden önce uyudular."}],
[["condition_rc_b", 9], "DashedAcceptabilityJudgment", {s: "Yordukları oyuncu onikiden önce uyudu."}],
[["condition_rc_c", 9], "DashedAcceptabilityJudgment", {s: "Yorduğu oyuncu onikiden önce uyudular."}],
[["condition_rc_d", 9], "DashedAcceptabilityJudgment", {s: "Yorduğu oyuncu onikiden önce uyudu."}],
[["condition_gen_a", 9], "DashedAcceptabilityJudgment", {s: "Yönetmenlerin oyuncusu onikiden önce uyudular."  } ],
[["condition_gen_b", 9], "DashedAcceptabilityJudgment", {s: "Yönetmenlerin oyuncusu onikiden önce uyudu."  } ],
[["condition_gen_c", 9], "DashedAcceptabilityJudgment", {s: "Yönetmenin oyuncusu onikiden önce uyudular."  } ],
[["condition_gen_d", 9], "DashedAcceptabilityJudgment", {s: "Yönetmenin oyuncusu onikiden önce uyudu."  } ],

[["condition_rc_a", 10], "DashedAcceptabilityJudgment", {s: "Çalıştırdıkları hizmetçi yorgun argın yattılar."}],
[["condition_rc_b", 10], "DashedAcceptabilityJudgment", {s: "Çalıştırdıkları hizmetçi yorgun argın yattı."}],
[["condition_rc_c", 10], "DashedAcceptabilityJudgment", {s: "Çalıştırdığı hizmetçi yorgun argın yattılar."}],
[["condition_rc_d", 10], "DashedAcceptabilityJudgment", {s: "Çalıştırdığı hizmetçi yorgun argın yattı."}],
[["condition_gen_a", 10], "DashedAcceptabilityJudgment", {s: "Aristokratların hizmetçisi yorgun argın yattılar."  } ],
[["condition_gen_b", 10], "DashedAcceptabilityJudgment", {s: "Aristokratların hizmetçisi yorgun argın yattı."  } ],
[["condition_gen_c", 10], "DashedAcceptabilityJudgment", {s: "Aristokratın hizmetçisi yorgun argın yattılar."  } ],
[["condition_gen_d", 10], "DashedAcceptabilityJudgment", {s: "Aristokratın hizmetçisi yorgun argın yattı."  } ],

[["condition_rc_a", 11], "DashedAcceptabilityJudgment", {s: "Kovdukları sunucu olağanüstü bir hızla konuştular."}],
[["condition_rc_b", 11], "DashedAcceptabilityJudgment", {s: "Kovdukları sunucu olağanüstü bir hızla konuştu."}],
[["condition_rc_c", 11], "DashedAcceptabilityJudgment", {s: "Kovduğu sunucu olağanüstü bir hızla konuştular."}],
[["condition_rc_d", 11], "DashedAcceptabilityJudgment", {s: "Kovduğu sunucu olağanüstü bir hızla konuştu."}],
[["condition_gen_a", 11], "DashedAcceptabilityJudgment", {s: "Konuşmacılarnın sunucusu olağanüstü bir hızla konuştular."  } ],
[["condition_gen_b", 11], "DashedAcceptabilityJudgment", {s: "Konuşmacılarnın sunucusu olağanüstü bir hızla konuştu."  } ],
[["condition_gen_c", 11], "DashedAcceptabilityJudgment", {s: "Konuşmacının sunucusu olağanüstü bir hızla konuştular."  } ],
[["condition_gen_d", 11], "DashedAcceptabilityJudgment", {s: "Konuşmacının sunucusu olağanüstü bir hızla konuştu."  } ],

[["condition_rc_a", 12], "DashedAcceptabilityJudgment", {s: "Kaybettikleri turist aç susuz dolaştılar."}],
[["condition_rc_b", 12], "DashedAcceptabilityJudgment", {s: "Kaybettikleri turist aç susuz dolaştı."}],
[["condition_rc_c", 12], "DashedAcceptabilityJudgment", {s: "Kaybettiği turist aç susuz dolaştılar."}],
[["condition_rc_d", 12], "DashedAcceptabilityJudgment", {s: "Kaybettiği turist aç susuz dolaştı."}],
[["condition_gen_a", 12], "DashedAcceptabilityJudgment", {s: "Müzelerin ziyaretçisi aç susuz dolaştılar."}],
[["condition_gen_b", 12], "DashedAcceptabilityJudgment", {s: "Müzelerin ziyaretçisi aç susuz dolaştı."}],
[["condition_gen_c", 12], "DashedAcceptabilityJudgment", {s: "Müzenin ziyaretçisi aç susuz dolaştılar."}],
[["condition_gen_d", 12], "DashedAcceptabilityJudgment", {s: "Müzenin ziyaretçisi aç susuz dolaştı."}],

[["condition_rc_a", 13], "DashedAcceptabilityJudgment", {s: "Cezalandırdıkları hoca hapisten çabucak çıktılar."}],
[["condition_rc_b", 13], "DashedAcceptabilityJudgment", {s: "Cezalandırdıkları hoca hapisten çabucak çıktı."}],
[["condition_rc_c", 13], "DashedAcceptabilityJudgment", {s: "Cezalandırdığı hoca hapisten çabucak çıktılar."}],
[["condition_rc_d", 13], "DashedAcceptabilityJudgment", {s: "Cezalandırdığı hoca hapisten çabucak çıktı."}],
[["condition_gen_a", 13], "DashedAcceptabilityJudgment", {s: "Politikacıların hocası adliyeden çabucak çıktılar."  } ],
[["condition_gen_b", 13], "DashedAcceptabilityJudgment", {s: "Politikacıların hocası adliyeden çabucak çıktı."  } ],
[["condition_gen_c", 13], "DashedAcceptabilityJudgment", {s: "Politikacının hocası adliyeden çabucak çıktılar."  } ],
[["condition_gen_d", 13], "DashedAcceptabilityJudgment", {s: "Politikacının hocası adliyeden çabucak çıktı."  } ],

[["condition_rc_a", 14], "DashedAcceptabilityJudgment", {s: "Uyandırdıkları çaycı nedensiz yere kızdılar."}],
[["condition_rc_b", 14], "DashedAcceptabilityJudgment", {s: "Uyandırdıkları çaycı nedensiz yere kızdı."}],
[["condition_rc_c", 14], "DashedAcceptabilityJudgment", {s: "Uyandırdığı çaycı nedensiz yere kızdılar."}],
[["condition_rc_d", 14], "DashedAcceptabilityJudgment", {s: "Uyandırdığı çaycı nedensiz yere kızdı."}],
[["condition_gen_a", 14], "DashedAcceptabilityJudgment", {s: "Hakimlerin çaycısı nedensiz yere kızdılar."  } ],
[["condition_gen_b", 14], "DashedAcceptabilityJudgment", {s: "Hakimlerin çaycısı nedensiz yere kızdı."  } ],
[["condition_gen_c", 14], "DashedAcceptabilityJudgment", {s: "Hakimin çaycısı nedensiz yere kızdılar."  } ],
[["condition_gen_d", 14], "DashedAcceptabilityJudgment", {s: "Hakimin çaycısı nedensiz yere kızdı."  } ],

[["condition_rc_a", 15], "DashedAcceptabilityJudgment", {s: "Susturdukları hemşire etrafta amaçsızca gezdiler."}],
[["condition_rc_b", 15], "DashedAcceptabilityJudgment", {s: "Susturdukları hemşire etrafta amaçsızca gezdi."}],
[["condition_rc_c", 15], "DashedAcceptabilityJudgment", {s: "Susturduğu hemşire etrafta amaçsızca gezdiler."}],
[["condition_rc_d", 15], "DashedAcceptabilityJudgment", {s: "Susturduğu hemşire etrafta amaçsızca gezdi."}],
[["condition_gen_a", 15], "DashedAcceptabilityJudgment", {s: "Oyuncuların hemşiresi etrafta amaçsızca gezdiler."  } ],
[["condition_gen_b", 15], "DashedAcceptabilityJudgment", {s: "Oyuncuların hemşiresi etrafta amaçsızca gezdi."  } ],
[["condition_gen_c", 15], "DashedAcceptabilityJudgment", {s: "Oyuncunun hemşiresi etrafta amaçsızca gezdiler."  } ],
[["condition_gen_d", 15], "DashedAcceptabilityJudgment", {s: "Oyuncunun hemşiresi etrafta amaçsızca gezdi."  } ],

[["condition_rc_a", 16], "DashedAcceptabilityJudgment", {s: "Sordukları müdire biraz önce aradılar."}],
[["condition_rc_b", 16], "DashedAcceptabilityJudgment", {s: "Sordukları müdire biraz önce aradı."}],
[["condition_rc_c", 16], "DashedAcceptabilityJudgment", {s: "Sorduğu müdire biraz önce aradılar."}],
[["condition_rc_d", 16], "DashedAcceptabilityJudgment", {s: "Sorduğu müdire biraz önce aradı."}],
[["condition_gen_a", 16], "DashedAcceptabilityJudgment", {s: "Çalışanların müdiresi biraz önce aradılar."  } ],
[["condition_gen_b", 16], "DashedAcceptabilityJudgment", {s: "Çalışanların müdiresi biraz önce aradı."  } ],
[["condition_gen_c", 16], "DashedAcceptabilityJudgment", {s: "Çalışanın müdiresi biraz önce aradılar."  } ],
[["condition_gen_d", 16], "DashedAcceptabilityJudgment", {s: "Çalışanın müdiresi biraz önce aradı."  } ],

[["condition_rc_a", 17], "DashedAcceptabilityJudgment", {s: "Gönderdikleri terzi tamamen gereksizce bağırdılar."}],
[["condition_rc_b", 17], "DashedAcceptabilityJudgment", {s: "Gönderdikleri terzi tamamen gereksizce bağırdı."}],
[["condition_rc_c", 17], "DashedAcceptabilityJudgment", {s: "Gönderdiği terzi tamamen gereksizce bağırdılar."}],
[["condition_rc_d", 17], "DashedAcceptabilityJudgment", {s: "Gönderdiği terzi tamamen gereksizce bağırdı."}],
[["condition_gen_a", 17], "DashedAcceptabilityJudgment", {s: "Milyonerlerin terzisi tamamen gereksizce bağırdılar."  } ],
[["condition_gen_b", 17], "DashedAcceptabilityJudgment", {s: "Milyonerlerin terzisi tamamen gereksizce bağırdı."  } ],
[["condition_gen_c", 17], "DashedAcceptabilityJudgment", {s: "Milyonerin terzisi tamamen gereksizce bağırdılar."  } ],
[["condition_gen_d", 17], "DashedAcceptabilityJudgment", {s: "Milyonerin terzisi tamamen gereksizce bağırdı."  } ],

[["condition_rc_a", 18], "DashedAcceptabilityJudgment", {s: "Buldukları bakıcı çok kibar davrandılar."}],
[["condition_rc_b", 18], "DashedAcceptabilityJudgment", {s: "Buldukları bakıcı çok kibar davrandı."}],
[["condition_rc_c", 18], "DashedAcceptabilityJudgment", {s: "Bulduğu bakıcı çok kibar davrandılar."}],
[["condition_rc_d", 18], "DashedAcceptabilityJudgment", {s: "Bulduğu bakıcı çok kibar davrandı."}],
[["condition_gen_a", 18], "DashedAcceptabilityJudgment", {s: "Bebeklerin bakıcısı çok kibar davrandılar."  } ],
[["condition_gen_b", 18], "DashedAcceptabilityJudgment", {s: "Bebeklerin bakıcısı çok kibar davrandı."  } ],
[["condition_gen_c", 18], "DashedAcceptabilityJudgment", {s: "Bebeğin bakıcısı çok kibar davrandılar."  } ],
[["condition_gen_d", 18], "DashedAcceptabilityJudgment", {s: "Bebeğin bakıcısı çok kibar davrandı."  } ],

[["condition_rc_a", 19], "DashedAcceptabilityJudgment", {s: "Beğendikleri dadı sahil boyunca süzüldüler."}],
[["condition_rc_b", 19], "DashedAcceptabilityJudgment", {s: "Beğendikleri dadı sahil boyunca süzüldü."}],
[["condition_rc_c", 19], "DashedAcceptabilityJudgment", {s: "Beğendiği dadı sahil boyunca süzüldüler."}],
[["condition_rc_d", 19], "DashedAcceptabilityJudgment", {s: "Beğendiği dadı sahil boyunca süzüldü."}],
[["condition_gen_a", 19], "DashedAcceptabilityJudgment", {s: "Komşuların dadısı sahil boyunca süzüldüler."}],
[["condition_gen_b", 19], "DashedAcceptabilityJudgment", {s: "Komşuların dadısı sahil boyunca süzüldü."}],
[["condition_gen_c", 19], "DashedAcceptabilityJudgment", {s: "Komşunun dadısı sahil boyunca süzüldüler."}],
[["condition_gen_d", 19], "DashedAcceptabilityJudgment", {s: "Komşunun dadısı sahil boyunca süzüldü."}],

[["condition_rc_a", 20], "DashedAcceptabilityJudgment", {s: "Araştırdıkları tamirci çok yavaş çalıştılar."}],
[["condition_rc_b", 20], "DashedAcceptabilityJudgment", {s: "Araştırdıkları tamirci çok yavaş çalıştı."}],
[["condition_rc_c", 20], "DashedAcceptabilityJudgment", {s: "Araştırdığı tamirci çok yavaş çalıştılar."}],
[["condition_rc_d", 20], "DashedAcceptabilityJudgment", {s: "Araştırdığı tamirci çok yavaş çalıştı."}],
[["condition_gen_a", 20], "DashedAcceptabilityJudgment", {s: "Polislerin tamircisi aç susuz çalıştılar."  } ],
[["condition_gen_b", 20], "DashedAcceptabilityJudgment", {s: "Polislerin tamircisi aç susuz çalıştı."  } ],
[["condition_gen_c", 20], "DashedAcceptabilityJudgment", {s: "Polisin tamircisi aç susuz çalıştılar."  } ],
[["condition_gen_d", 20], "DashedAcceptabilityJudgment", {s: "Polisin tamircisi aç susuz çalıştı."  } ],

[["condition_rc_a", 21], "DashedAcceptabilityJudgment", {s: "Efkarlandırdıkları taksici saatlerce durmaksızın içtiler."}],
[["condition_rc_b", 21], "DashedAcceptabilityJudgment", {s: "Efkarlandırdıkları taksici saatlerce durmaksızın içti."}],
[["condition_rc_c", 21], "DashedAcceptabilityJudgment", {s: "Efkarlandırdığı taksici saatlerce durmaksızın içtiler."}],
[["condition_rc_d", 21], "DashedAcceptabilityJudgment", {s: "Efkarlandırdığı taksici saatlerce durmaksızın içti."}],
[["condition_gen_a", 21], "DashedAcceptabilityJudgment", {s: "Modacıların taksicisi saatlerce durmaksızın içtiler."  } ],
[["condition_gen_b", 21], "DashedAcceptabilityJudgment", {s: "Modacıların taksicisi saatlerce durmaksızın içti."  } ],
[["condition_gen_c", 21], "DashedAcceptabilityJudgment", {s: "Modacının taksicisi saatlerce durmaksızın içtiler."  } ],
[["condition_gen_d", 21], "DashedAcceptabilityJudgment", {s: "Modacının taksicisi saatlerce durmaksızın içti."  } ],

[["condition_rc_a", 22], "DashedAcceptabilityJudgment", {s: "Kovaladıkları çalgıcı feci bir şekilde öldüler."}],
[["condition_rc_b", 22], "DashedAcceptabilityJudgment", {s: "Kovaladıkları çalgıcı feci bir şekilde öldü."}],
[["condition_rc_c", 22], "DashedAcceptabilityJudgment", {s: "Kovaladığı çalgıcı feci bir şekilde öldüler."}],
[["condition_rc_d", 22], "DashedAcceptabilityJudgment", {s: "Kovaladığı çalgıcı feci bir şekilde öldü."}],
[["condition_gen_a", 22], "DashedAcceptabilityJudgment", {s: "Sanatçıların çalgıcısı feci bir şekilde öldüler."  } ],
[["condition_gen_b", 22], "DashedAcceptabilityJudgment", {s: "Sanatçıların çalgıcısı feci bir şekilde öldü."  } ],
[["condition_gen_c", 22], "DashedAcceptabilityJudgment", {s: "Sanatçının çalgıcısı feci bir şekilde öldüler."  } ],
[["condition_gen_d", 22], "DashedAcceptabilityJudgment", {s: "Sanatçının çalgıcısı feci bir şekilde öldü."  } ],

[["condition_rc_a", 23], "DashedAcceptabilityJudgment", {s: "Gittikleri dişçi ilk kez çılgınca eğlendiler."}],
[["condition_rc_b", 23], "DashedAcceptabilityJudgment", {s: "Gittikleri dişçi ilk kez çılgınca eğlendi."}],
[["condition_rc_c", 23], "DashedAcceptabilityJudgment", {s: "Gittiği dişçi ilk kez çılgınca eğlendiler."}],
[["condition_rc_d", 23], "DashedAcceptabilityJudgment", {s: "Gittiği dişçi ilk kez çılgınca eğlendi."}],
[["condition_gen_a", 23], "DashedAcceptabilityJudgment", {s: "Dedektiflerin dişçisi ilk kez çılgınca eğlendiler."  } ],
[["condition_gen_b", 23], "DashedAcceptabilityJudgment", {s: "Dedektiflerin dişçisi ilk kez çılgınca eğlendi."  } ],
[["condition_gen_c", 23], "DashedAcceptabilityJudgment", {s: "Dedektifin dişçisi ilk kez çılgınca eğlendiler."  } ],
[["condition_gen_d", 23], "DashedAcceptabilityJudgment", {s: "Dedektifin dişçisi ilk kez çılgınca eğlendi."  } ],

[["condition_rc_a", 24], "DashedAcceptabilityJudgment", {s: "Ağlattıkları müşteri şikayetinden hemen sonra sustular."}],
[["condition_rc_b", 24], "DashedAcceptabilityJudgment", {s: "Ağlattıkları müşteri şikayetinden hemen sonra sustu."}],
[["condition_rc_c", 24], "DashedAcceptabilityJudgment", {s: "Ağlattığı müşteri şikayetinden hemen sonra sustular."}],
[["condition_rc_d", 24], "DashedAcceptabilityJudgment", {s: "Ağlattığı müşteri şikayetinden hemen sonra sustu."}],
[["condition_gen_a", 24], "DashedAcceptabilityJudgment", {s: "Esnafların müşterisi şikayettten hemen sonra sustular."  } ],
[["condition_gen_b", 24], "DashedAcceptabilityJudgment", {s: "Esnafların müşterisi şikayettten hemen sonra sustu."  } ],
[["condition_gen_c", 24], "DashedAcceptabilityJudgment", {s: "Esnafın müşterisi şikayettten hemen sonra sustular."  } ],
[["condition_gen_d", 24], "DashedAcceptabilityJudgment", {s: "Esnafın müşterisi şikayettten hemen sonra sustu."  } ],

[["condition_rc_a", 25], "DashedAcceptabilityJudgment", {s: "Çıldırttıkları koruma her zamanki gibi geciktiler."}],
[["condition_rc_b", 25], "DashedAcceptabilityJudgment", {s: "Çıldırttıkları koruma her zamanki gibi gecikti."}],
[["condition_rc_c", 25], "DashedAcceptabilityJudgment", {s: "Çıldırttığı koruma her zamanki gibi geciktiler."}],
[["condition_rc_d", 25], "DashedAcceptabilityJudgment", {s: "Çıldırttığı koruma her zamanki gibi gecikti."}],
[["condition_gen_a", 25], "DashedAcceptabilityJudgment", {s: "Şarkıcıların koruması her zamanki gibi geciktiler."  } ],
[["condition_gen_b", 25], "DashedAcceptabilityJudgment", {s: "Şarkıcıların koruması her zamanki gibi gecikti."  } ],
[["condition_gen_c", 25], "DashedAcceptabilityJudgment", {s: "Şarkıcının koruması her zamanki gibi geciktiler."  } ],
[["condition_gen_d", 25], "DashedAcceptabilityJudgment", {s: "Şarkıcının koruması her zamanki gibi gecikti."  } ],

[["condition_rc_a", 26], "DashedAcceptabilityJudgment", {s: "Getirdikleri izleyici akşama kadar sessizce oturdular."}],
[["condition_rc_b", 26], "DashedAcceptabilityJudgment", {s: "Getirdikleri izleyici akşama kadar sessizce oturdu."}],
[["condition_rc_c", 26], "DashedAcceptabilityJudgment", {s: "Getirdiği izleyici akşama kadar sessizce oturdular."}],
[["condition_rc_d", 26], "DashedAcceptabilityJudgment", {s: "Getirdiği izleyici akşama kadar sessizce oturdu."}],
[["condition_gen_a", 26], "DashedAcceptabilityJudgment", {s: "Göstericilerin izleyicisi akşama kadar sessizce oturdular."  } ],
[["condition_gen_b", 26], "DashedAcceptabilityJudgment", {s: "Göstericilerin izleyicisi akşama kadar sessizce oturdu."  } ],
[["condition_gen_c", 26], "DashedAcceptabilityJudgment", {s: "Göstericinin izleyicisi akşama kadar sessizce oturdular."  } ],
[["condition_gen_d", 26], "DashedAcceptabilityJudgment", {s: "Göstericinin izleyicisi akşama kadar sessizce oturdu."  } ],

[["condition_rc_a", 27], "DashedAcceptabilityJudgment", {s: "Delirttikleri hasta akşamki muayeneden önce kaçtılar."}],
[["condition_rc_b", 27], "DashedAcceptabilityJudgment", {s: "Delirttikleri hasta akşamki muayeneden önce kaçtı."}],
[["condition_rc_c", 27], "DashedAcceptabilityJudgment", {s: "Delirttiği hasta akşamki muayeneden önce kaçtılar."}],
[["condition_rc_d", 27], "DashedAcceptabilityJudgment", {s: "Delirttiği hasta akşamki muayeneden önce kaçtı."}],
[["condition_gen_a", 27], "DashedAcceptabilityJudgment", {s: "Cerrahların hastası akşamki gösteriden önce kaçtılar."  } ],
[["condition_gen_b", 27], "DashedAcceptabilityJudgment", {s: "Cerrahların hastası akşamki gösteriden önce kaçtı."  } ],
[["condition_gen_c", 27], "DashedAcceptabilityJudgment", {s: "Cerrahın hastası akşamki gösteriden önce kaçtılar."  } ],
[["condition_gen_d", 27], "DashedAcceptabilityJudgment", {s: "Cerrahın hastası akşamki gösteriden önce kaçtı."  } ],

[["condition_rc_a", 28], "DashedAcceptabilityJudgment", {s: "Anlaştıkları terapist bile bile geç kaldılar."}],
[["condition_rc_b", 28], "DashedAcceptabilityJudgment", {s: "Anlaştıkları terapist bile bile geç kaldı."}],
[["condition_rc_c", 28], "DashedAcceptabilityJudgment", {s: "Anlaştığı terapist bile bile geç kaldılar."}],
[["condition_rc_d", 28], "DashedAcceptabilityJudgment", {s: "Anlaştığı terapist bile bile geç kaldı."}],
[["condition_gen_a", 28], "DashedAcceptabilityJudgment", {s: "Öğrenclerin terapisti bile bile geç kaldılar."  } ],
[["condition_gen_b", 28], "DashedAcceptabilityJudgment", {s: "Öğrencilerin terapisti bile bile geç kaldı."  } ],
[["condition_gen_c", 28], "DashedAcceptabilityJudgment", {s: "Öğrencinin terapisti bile bile geç kaldılar."  } ],
[["condition_gen_d", 28], "DashedAcceptabilityJudgment", {s: "Öğrencinin terapisti bile bile geç kaldı."  } ],

[["condition_rc_a", 29], "DashedAcceptabilityJudgment", {s: "Güvendikleri işçi beklenmedik bir anda hastalandılar."}],
[["condition_rc_b", 29], "DashedAcceptabilityJudgment", {s: "Güvendikleri işçi beklenmedik bir anda hastalandı."}],
[["condition_rc_c", 29], "DashedAcceptabilityJudgment", {s: "Güvendiği işçi beklenmedik bir anda hastalandılar."}],
[["condition_rc_d", 29], "DashedAcceptabilityJudgment", {s: "Güvendiği işçi beklenmedik bir anda hastalandı."}],
[["condition_gen_a", 29], "DashedAcceptabilityJudgment", {s: "Fabrikatörlerin işçisi beklenmedik bir anda hastalandılar."  } ],
[["condition_gen_b", 29], "DashedAcceptabilityJudgment", {s: "Fabrikatörlerin işçisi beklenmedik bir anda hastalandı."  } ],
[["condition_gen_c", 29], "DashedAcceptabilityJudgment", {s: "Fabrikatörün işçisi beklenmedik bir anda hastalandılar."  } ],
[["condition_gen_d", 29], "DashedAcceptabilityJudgment", {s: "Fabrikatörün işçisi beklenmedik bir anda hastalandı."  } ],

[["condition_rc_a", 30], "DashedAcceptabilityJudgment", {s: "Eğittikleri hostes sert rüzgarlardan dolayı üşüdüler."}],
[["condition_rc_b", 30], "DashedAcceptabilityJudgment", {s: "Eğittikleri hostes sert rüzgarlardan dolayı üşüdü."}],
[["condition_rc_c", 30], "DashedAcceptabilityJudgment", {s: "Eğittiği hostes sert rüzgarlardan dolayı üşüdüler."}],
[["condition_rc_d", 30], "DashedAcceptabilityJudgment", {s: "Eğittiği hostes sert rüzgarlardan dolayı üşüdü."}],
[["condition_gen_a", 30], "DashedAcceptabilityJudgment", {s: "Yolcuların hostesi poyrazdan dolayı üşüdüler."  } ],
[["condition_gen_b", 30], "DashedAcceptabilityJudgment", {s: "Yolcuların hostesi poyrazdan dolayı üşüdü."  } ],
[["condition_gen_c", 30], "DashedAcceptabilityJudgment", {s: "Yolcunun hostesi poyrazdan dolayı üşüdüler."  } ],
[["condition_gen_d", 30], "DashedAcceptabilityJudgment", {s: "Yolcunun hostesi poyrazdan dolayı üşüdü."  } ],

[["condition_rc_a", 31], "DashedAcceptabilityJudgment", {s: "Doyurdukları yolcu yemekten sonra yine acıktılar."}],
[["condition_rc_b", 31], "DashedAcceptabilityJudgment", {s: "Doyurdukları yolcu yemekten sonra yine acıktı."}],
[["condition_rc_c", 31], "DashedAcceptabilityJudgment", {s: "Doyurduğu yolcu yemekten sonra yine acıktılar."}],
[["condition_rc_d", 31], "DashedAcceptabilityJudgment", {s: "Doyurduğu yolcu yemekten sonra yine acıktı."}],
[["condition_gen_a", 31], "DashedAcceptabilityJudgment", {s: "Şoförlerin yolcusu yemekten sonra yine acıktılar."  } ],
[["condition_gen_b", 31], "DashedAcceptabilityJudgment", {s: "Şoförlerin yolcusu yemekten sonra yine acıktı."  } ],
[["condition_gen_c", 31], "DashedAcceptabilityJudgment", {s: "Şoförün yolcusu yemekten sonra yine acıktılar."  } ],
[["condition_gen_d", 31], "DashedAcceptabilityJudgment", {s: "Şoförün yolcusu yemekten sonra yine acıktı."  } ],

[["condition_rc_a", 32], "DashedAcceptabilityJudgment", {s: "Çağırdıkları kapıcı erken ödemeden dolayı sevindiler."}],
[["condition_rc_b", 32], "DashedAcceptabilityJudgment", {s: "Çağırdıkları kapıcı erken ödemeden dolayı sevindi."}],
[["condition_rc_c", 32], "DashedAcceptabilityJudgment", {s: "Çağırdığı kapıcı erken ödemeden dolayı sevindiler."}],
[["condition_rc_d", 32], "DashedAcceptabilityJudgment", {s: "Çağırdığı kapıcı erken ödemeden dolayı sevindi."}],
[["condition_gen_a", 32], "DashedAcceptabilityJudgment", {s: "Mühendislerin kapıcısı erken ödemeden dolayı sevindiler."  } ],
[["condition_gen_b", 32], "DashedAcceptabilityJudgment", {s: "Mühendislerin kapıcısı erken ödemeden dolayı sevindi."  } ],
[["condition_gen_c", 32], "DashedAcceptabilityJudgment", {s: "Mühendisin kapıcısı erken ödemeden dolayı sevindiler."  } ],
[["condition_gen_d", 32], "DashedAcceptabilityJudgment", {s: "Mühendisin kapıcısı erken ödemeden dolayı sevindi."  } ],

[["condition_rc_a", 33], "DashedAcceptabilityJudgment", {s: "Yordukları nakliyeci mesaiden hemen sonra uzandılar."}],
[["condition_rc_b", 33], "DashedAcceptabilityJudgment", {s: "Yordukları nakliyeci mesaiden hemen sonra uzandı."}],
[["condition_rc_c", 33], "DashedAcceptabilityJudgment", {s: "Yorduğu nakliyeci mesaiden hemen sonra uzandılar."}],
[["condition_rc_d", 33], "DashedAcceptabilityJudgment", {s: "Yorduğu nakliyeci mesaiden hemen sonra uzandı."}],
[["condition_gen_a", 33], "DashedAcceptabilityJudgment", {s: "Pazarcıların nakliyecisi mesaiden hemen sonra uzandılar."  } ],
[["condition_gen_b", 33], "DashedAcceptabilityJudgment", {s: "Pazarcıların nakliyecisi mesaiden hemen sonra uzandı."  } ],
[["condition_gen_c", 33], "DashedAcceptabilityJudgment", {s: "Pazarcının nakliyecisi mesaiden hemen sonra uzandılar."  } ],
[["condition_gen_d", 33], "DashedAcceptabilityJudgment", {s: "Pazarcının nakliyecisi mesaiden hemen sonra uzandı."  } ],

[["condition_rc_a", 34], "DashedAcceptabilityJudgment", {s: "Yetiştirdikleri eğitimci ilk denemede epey zorlandılar."}],
[["condition_rc_b", 34], "DashedAcceptabilityJudgment", {s: "Yetiştirdikleri eğitimci ilk denemede epey zorlandı."}],
[["condition_rc_c", 34], "DashedAcceptabilityJudgment", {s: "Yetiştirdiği eğitimci ilk denemede epey zorlandılar."}],
[["condition_rc_d", 34], "DashedAcceptabilityJudgment", {s: "Yetiştirdiği eğitimci ilk denemede epey zorlandı."}],
[["condition_gen_a", 34], "DashedAcceptabilityJudgment", {s: "Oyuncuların eğitimcisi ilk denemede epey zorlandılar."  } ],
[["condition_gen_b", 34], "DashedAcceptabilityJudgment", {s: "Oyuncuların eğitimcisi ilk denemede epey zorlandı."  } ],
[["condition_gen_c", 34], "DashedAcceptabilityJudgment", {s: "Oyuncunun eğitimcisi ilk denemede epey zorlandılar."  } ],
[["condition_gen_d", 34], "DashedAcceptabilityJudgment", {s: "Oyuncunun eğitimcisi ilk denemede epey zorlandı."  } ],

[["condition_rc_a", 35], "DashedAcceptabilityJudgment", {s: "Kiraladıkları animatör geç bir vakitte kalktılar."}],
[["condition_rc_b", 35], "DashedAcceptabilityJudgment", {s: "Kiraladıkları animatör geç bir vakitte kalktı."}],
[["condition_rc_c", 35], "DashedAcceptabilityJudgment", {s: "Kiraladığı animatör geç bir vakitte kalktılar."}],
[["condition_rc_d", 35], "DashedAcceptabilityJudgment", {s: "Kiraladığı animatör geç bir vakitte kalktı."}],
[["condition_gen_a", 35], "DashedAcceptabilityJudgment", {s: "Zenginlerin animatörü geç bir vakitte kalktılar."  } ],
[["condition_gen_b", 35], "DashedAcceptabilityJudgment", {s: "Zenginlerin animatörü geç bir vakitte kalktı."  } ],
[["condition_gen_c", 35], "DashedAcceptabilityJudgment", {s: "Zenginin animatörü geç bir vakitte kalktılar."  } ],
[["condition_gen_d", 35], "DashedAcceptabilityJudgment", {s: "Zenginin animatörü geç bir vakitte kalktı."  } ],

[["condition_rc_a", 36], "DashedAcceptabilityJudgment", {s: "Yaraladıkları polis müthiş bir ağrıyla uyandılar."}],
[["condition_rc_b", 36], "DashedAcceptabilityJudgment", {s: "Yaraladıkları polis müthiş bir ağrıyla uyandı."}],
[["condition_rc_c", 36], "DashedAcceptabilityJudgment", {s: "Yaraladığı polis müthiş bir ağrıyla uyandılar."}],
[["condition_rc_d", 36], "DashedAcceptabilityJudgment", {s: "Yaraladığı polis müthiş bir ağrıyla uyandı."}],
[["condition_gen_a", 36], "DashedAcceptabilityJudgment", {s: "Vekillerin polisi müthiş bir ağrıyla uyandılar."  } ],
[["condition_gen_b", 36], "DashedAcceptabilityJudgment", {s: "Vekillerin polisi müthiş bir ağrıyla uyandı."  } ],
[["condition_gen_c", 36], "DashedAcceptabilityJudgment", {s: "Vekilin polisi müthiş bir ağrıyla uyandılar."  } ],
[["condition_gen_d", 36], "DashedAcceptabilityJudgment", {s: "Vekilin polisi müthiş bir ağrıyla uyandı."  } ],

[["condition_rc_a", 37], "DashedAcceptabilityJudgment", {s: "Kaçırdıkları hırsız boş bir caddede yürüdüler."}],
[["condition_rc_b", 37], "DashedAcceptabilityJudgment", {s: "Kaçırdıkları hırsız boş bir caddede yürüdü."}],
[["condition_rc_c", 37], "DashedAcceptabilityJudgment", {s: "Kaçırdığı hırsız boş bir caddede yürüdüler."}],
[["condition_rc_d", 37], "DashedAcceptabilityJudgment", {s: "Kaçırdığı hırsız boş bir caddede yürüdü."}],
[["condition_gen_a", 37], "DashedAcceptabilityJudgment", {s: "Parşömenlerin hırsızı boş bir caddede yürüdüler."  } ],
[["condition_gen_b", 37], "DashedAcceptabilityJudgment", {s: "Parşömenlerin hırsızı boş bir caddede yürüdü."  } ],
[["condition_gen_c", 37], "DashedAcceptabilityJudgment", {s: "Parşömenin hırsızı boş bir caddede yürüdüler."  } ],
[["condition_gen_d", 37], "DashedAcceptabilityJudgment", {s: "Parşömenin hırsızı boş bir caddede yürüdü."  } ],

[["condition_rc_a", 38], "DashedAcceptabilityJudgment", {s: "Zehirledikleri kral toplantıdan sonra birden sarardılar."}],
[["condition_rc_b", 38], "DashedAcceptabilityJudgment", {s: "Zehirledikleri kral toplantıdan sonra birden sarardı."}],
[["condition_rc_c", 38], "DashedAcceptabilityJudgment", {s: "Zehirlediği kral toplantıdan sonra birden sarardılar."}],
[["condition_rc_d", 38], "DashedAcceptabilityJudgment", {s: "Zehirlediği kral toplantıdan sonra birden sarardı."}],
[["condition_gen_a", 38], "DashedAcceptabilityJudgment", {s: "Toplulukların kralı toplantıdan sonra birden sarardılar."  } ],
[["condition_gen_b", 38], "DashedAcceptabilityJudgment", {s: "Toplulukların kralı toplantıdan sonra birden sarardı."  } ],
[["condition_gen_c", 38], "DashedAcceptabilityJudgment", {s: "Topluluğun kralı toplantıdan sonra birden sarardılar."  } ],
[["condition_gen_d", 38], "DashedAcceptabilityJudgment", {s: "Topluluğun kralı toplantıdan sonra birden sarardı."  } ],

[["condition_rc_a", 39], "DashedAcceptabilityJudgment", {s: "Gezdirdikleri falcı yabancı bir ülkede kayboldular."}],
[["condition_rc_b", 39], "DashedAcceptabilityJudgment", {s: "Gezdirdikleri falcı yabancı bir ülkede kayboldu."}],
[["condition_rc_c", 39], "DashedAcceptabilityJudgment", {s: "Gezdirdiği falcı yabancı bir ülkede kayboldular."}],
[["condition_rc_d", 39], "DashedAcceptabilityJudgment", {s: "Gezdirdiği falcı yabancı bir ülkede kayboldu."}],
[["condition_gen_a", 39], "DashedAcceptabilityJudgment", {s: "Ünlülerin falcısı yabancı bir ülkede kayboldular."  } ],
[["condition_gen_b", 39], "DashedAcceptabilityJudgment", {s: "Ünlülerin falcısı yabancı bir ülkede kayboldu."  } ],
[["condition_gen_c", 39], "DashedAcceptabilityJudgment", {s: "Ünlünün falcısı yabancı bir ülkede kayboldular."  } ],
[["condition_gen_d", 39], "DashedAcceptabilityJudgment", {s: "Ünlünün falcısı yabancı bir ülkede kayboldu."  } ],

[["condition_rc_a", 40], "DashedAcceptabilityJudgment", {s: "Şüphelendirdikleri bekçi normalden çok yavaş gezindiler."}],
[["condition_rc_b", 40], "DashedAcceptabilityJudgment", {s: "Şüphelendirdikleri bekçi normalden çok yavaş gezindi."}],
[["condition_rc_c", 40], "DashedAcceptabilityJudgment", {s: "Şüphelendirdiği bekçi normalden çok yavaş gezindiler."}],
[["condition_rc_d", 40], "DashedAcceptabilityJudgment", {s: "Şüphelendirdiği bekçi normalden çok yavaş gezindi."}],
[["condition_gen_a", 40], "DashedAcceptabilityJudgment", {s: "Çiftçilerin bekçisi normalden çok yavaş gezindiler."  } ],
[["condition_gen_b", 40], "DashedAcceptabilityJudgment", {s: "Çiftçilerin bekçisi normalden çok yavaş gezindi."  } ],
[["condition_gen_c", 40], "DashedAcceptabilityJudgment", {s: "Çiftçinin bekçisi normalden çok yavaş gezindiler."  } ],
[["condition_gen_d", 40], "DashedAcceptabilityJudgment", {s: "Çiftçinin bekçisi normalden çok yavaş gezindi."  } ],

[["filler", 121], "DashedAcceptabilityJudgment", {s: "Okuttukları öğrenci başarılı olunca mutlu oldular."}],
[["filler", 122], "DashedAcceptabilityJudgment", {s: "Biriktirdikleri para dün kaybolunca çılgına döndüler."}],
[["filler", 123], "DashedAcceptabilityJudgment", {s: "Düşündükleri teknisyen hızlı çalıştığından tekrar çağırdılar."}],
[["filler", 124], "DashedAcceptabilityJudgment", {s: "Hazırladıkları yemek yere dökülünce yenisini yaptılar."}],
[["filler", 125], "DashedAcceptabilityJudgment", {s: "Başladıkları film kötü çıkınca dizi izlediler."}],
[["filler", 126], "DashedAcceptabilityJudgment", {s: "Diktikleri ağaç meyve verince epey şaşırdılar."}],
[["filler", 127], "DashedAcceptabilityJudgment", {s: "Sevdikleri öğretmen emekli olunca saatlerce ağlamışlar."}],
[["filler", 128], "DashedAcceptabilityJudgment", {s: "Kullandıkları ilaç rahatsız edince doktorla konuşmuşlar."}],
[["filler", 129], "DashedAcceptabilityJudgment", {s: "Söyledikleri yemek soğuk gelince geri gönderdiler."}],
[["filler", 130], "DashedAcceptabilityJudgment", {s: "Ayıpladıkları kadın onları duyunca biraz gerildiler."}],
[["filler", 131], "DashedAcceptabilityJudgment", {s: "Bahsettikleri ünlü kafeye gelince şok olmuşlar."}],
[["filler", 132], "DashedAcceptabilityJudgment", {s: "Bindikleri araba sorun çıkarınca hemen indiler."}],
[["filler", 133], "DashedAcceptabilityJudgment", {s: "Okudukları şiir seyirciler tarafından beğenilmeyince üzüldüler."}],
[["filler", 134], "DashedAcceptabilityJudgment", {s: "Dinledikleri şarkıcı yanlarına gelince aşırı heyecanlandılar."}],
[["filler", 135], "DashedAcceptabilityJudgment", {s: "Kaçtıkları katil durunca rahat bir nefes aldılar."}],
[["filler", 136], "DashedAcceptabilityJudgment", {s: "Karşılaştıkları çocuk kaybolduğu için oldukça endişelenmişler."}],
[["filler", 137], "DashedAcceptabilityJudgment", {s: "Aldıkları elma kurtlandığı için atmak zorunda kaldılar."}],
[["filler", 138], "DashedAcceptabilityJudgment", {s: "Kırdıkları tabak kolayca yapıştırılınca yenisini almadılar."}],
[["filler", 139], "DashedAcceptabilityJudgment", {s: "Yaptıkları heykel yağmurda ıslanınca kurulamaya giriştiler."}],
[["filler", 140], "DashedAcceptabilityJudgment", {s: "Gıdıkladıkları bebek üstlerine kusunca banyoya koştular."}],
[["filler", 101], "DashedAcceptabilityJudgment", {s: "Kızdığı bakan bulununca koltuk geri getirdi."}],
[["filler", 102], "DashedAcceptabilityJudgment", {s: "Aradığı asistan ayrılınca proje birden unuttu."}],
[["filler", 103], "DashedAcceptabilityJudgment", {s: "Beklediği kurye tökezleyince soslar yere saçtı."}],
[["filler", 104], "DashedAcceptabilityJudgment", {s: "Güldüğü soytarı asılınca şapka yerinde buldu."}],
[["filler", 105], "DashedAcceptabilityJudgment", {s: "Yazıştığı dekan hapşurunca çaylar aniden düşürdü."}],
[["filler", 106], "DashedAcceptabilityJudgment", {s: "Bildiği gözlükçü evlenince hediyeler ağlanarak verdi."}],
[["filler", 107], "DashedAcceptabilityJudgment", {s: "Savunduğu politikacı yakalanınca açıklama haliyle kesti."}],
[["filler", 108], "DashedAcceptabilityJudgment", {s: "Ağırladığı temizlikçi bayılınca deterjan tekrar saçtı."}],
[["filler", 109], "DashedAcceptabilityJudgment", {s: "Düşlediği manken nişanlanınca haber hızlıca yaydı."}],
[["filler", 110], "DashedAcceptabilityJudgment", {s: "Sözleştiği fabrikatör vurulunca kamera sessizce söktü."}],
[["filler", 111], "DashedAcceptabilityJudgment", {s: "istediği dansöz varınca kapı sakince açtı."}],
[["filler", 112], "DashedAcceptabilityJudgment", {s: "Haberleştiği çevirmen aramayınca metin keyfince bitirdi."}],
[["filler", 113], "DashedAcceptabilityJudgment", {s: "Bağırdığı muhasebeci kovulunca hesap tamamen karıştırdı."}],
[["filler", 114], "DashedAcceptabilityJudgment", {s: "Buluştuğu kürkçü dönünce kumaş erkenden dikti."}],
[["filler", 115], "DashedAcceptabilityJudgment", {s: "Seçtiği rektör atanınca kütüphane gece kapattı."}],
[["filler", 116], "DashedAcceptabilityJudgment", {s: "Görüştüğü şoför gecikince trafik aniden kilitledi."}],
[["filler", 117], "DashedAcceptabilityJudgment", {s: "Kandırdığı adam ödemeyince bulaşık saatlerce yıkadı."}],
[["filler", 118], "DashedAcceptabilityJudgment", {s: "Mesajlaştığı tesisatçı gelince borular güçlükle söktü."}],
[["filler", 119], "DashedAcceptabilityJudgment", {s: "üzdüğü mobilyacı kızınca koltuk sinirle parçaladı."}],
[["filler", 120], "DashedAcceptabilityJudgment", {s: "Tanıştığı medyum yanılınca fincan öfkeyle kırdı."}]


];
import re

with open("js/data/translations.js", "r", encoding="utf-8") as f:
    content = f.read()

# Add to ru, fa, ur, tl
tutorials_additions = {
    'ru': """  balancerTutorial: {
    modeTitle: "Переключатель режимов",
    modeDesc: "Переключайтесь между математическим балансированием существующего уравнения или интеллектуальным прогнозированием продуктов новой реакции.",
    scaleTitle: "Физические весы",
    scaleDesc: "Эти весы визуально отображают вес и дисбаланс атомов с обеих сторон реакции в реальном времени.",
    inputReactantsTitle: "Реагенты",
    inputReactantsDesc: "Введите ваши химические формулы здесь. Для примера мы автоматически введем 'Fe + O2'!",
    inputProductsTitle: "Продукты",
    inputProductsDesc: "Теперь добавим продукт. Мы введем 'Fe2O3'. Обратите внимание, как весы сразу реагируют на дисбаланс!",
    autoTitle: "Авто-балансировка",
    autoDesc: "Не хотите решать вручную? Нажмите здесь (или далее), и наш алгоритм мгновенно найдет оптимальные целые коэффициенты.",
    feedbackTitle: "Статус и копирование",
    feedbackDesc: "Идеально сбалансировано! Итоговое уравнение находится здесь. Нажмите на него, чтобы скопировать в буфер обмена!"
  },
  predictorTutorial: {
    modeTitle: "Переключатель режимов",
    modeDesc: "Мы находимся в режиме прогнозирования. Этот инструмент определяет продукты реакции на основе только реагентов.",
    inputTitle: "Реагенты",
    inputDesc: "Введите реагенты вашей реакции здесь. Для примера мы автоматически введем 'Na + Cl2'.",
    typeTitle: "Тип реакции",
    typeDesc: "Выберите классификацию реакции. Мы выберем Синтез, чтобы указать движку, как объединить реагенты.",
    predictTitle: "Прогноз продуктов",
    predictDesc: "Нажмите здесь (или далее)! Движок спрогнозирует продукт, а затем автоматически сбалансирует уравнение.",
    resultTitle: "Интеллектуальный вывод",
    resultDesc: "Вот ваш результат! Он показывает прогнозируемый продукт (NaCl) и итоговое сбалансированное уравнение (2Na + Cl2 → 2NaCl) с обоснованием."
  },
  molarMassTutorial: {
    inputTitle: "Ввод формулы",
    inputDesc: "Введите любую химическую формулу здесь. Для примера мы автоматически введем 'CaCO3' (Известняк)!",
    previewTitle: "Живой предпросмотр",
    previewDesc: "По мере ввода формула отображается с правильными индексами в реальном времени.",
    scaleTitle: "Интерактивные весы",
    scaleDesc: "Электронные весы анимируются, чтобы показать вычисленную молярную массу. Каждый элемент отображается в виде 3D-блока!",
    receiptTitle: "Квитанция веса",
    receiptDesc: "Нажмите 'Печать чека', и появится подробный чек — с указанием количества атомов каждого элемента, отдельной массы и общей суммы.",
    chipsTitle: "Быстрые примеры",
    chipsDesc: "Не знаете, что попробовать? Нажмите на любой из этих общих соединений, чтобы мгновенно загрузить и вычислить."
  },""",
    'fa': """  balancerTutorial: {
    modeTitle: "تغییر حالت",
    modeDesc: "بین موازنه ریاضی یک معادله موجود، یا پیش بینی هوشمندانه محصولات یک واکنش جدید جابجا شوید.",
    scaleTitle: "ترازوی فیزیکی",
    scaleDesc: "این ترازو وزن و عدم تعادل اتم ها را در دو طرف واکنش به صورت زنده نشان می دهد.",
    inputReactantsTitle: "واکنش دهنده ها",
    inputReactantsDesc: "فرمول های شیمیایی خود را اینجا وارد کنید. به عنوان مثال ما به صورت خودکار 'Fe + O2' را تایپ می کنیم!",
    inputProductsTitle: "محصولات",
    inputProductsDesc: "حالا بیایید محصول را اضافه کنیم. ما 'Fe2O3' را تایپ می کنیم. دقت کنید که ترازو چگونه به عدم تعادل واکنش نشان می دهد!",
    autoTitle: "موازنه خودکار",
    autoDesc: "نمی خواهید به صورت دستی حل کنید؟ اینجا (یا بعدی) کلیک کنید و الگوریتم ما فوراً ضرایب صحیح بهینه را پیدا می کند.",
    feedbackTitle: "وضعیت و کپی",
    feedbackDesc: "کاملاً موازنه شد! معادله نهایی در اینجا قرار دارد. برای کپی کردن مستقیماً در کلیپ بورد روی آن کلیک کنید!"
  },
  predictorTutorial: {
    modeTitle: "تغییر حالت",
    modeDesc: "اکنون در حالت پیش بینی هستیم. این ابزار محصولات واکنش را فقط بر اساس واکنش دهنده ها تعیین می کند.",
    inputTitle: "واکنش دهنده ها",
    inputDesc: "واکنش دهنده های واکنش خود را اینجا تایپ کنید. برای مثال ما به طور خودکار 'Na + Cl2' را وارد می کنیم.",
    typeTitle: "نوع واکنش",
    typeDesc: "دسته بندی واکنش را انتخاب کنید. ما سنتز را انتخاب می کنیم تا به موتور بگوییم چگونه این واکنش دهنده ها را دوباره ترکیب کند.",
    predictTitle: "پیش بینی محصولات",
    predictDesc: "اینجا (یا بعدی) کلیک کنید! موتور محصول را پیش بینی کرده و سپس معادله کامل را به طور خودکار موازنه می کند.",
    resultTitle: "خروجی هوشمند",
    resultDesc: "این هم نتیجه شما! این نتیجه محصول پیش بینی شده (NaCl) و معادله موازنه شده نهایی (2Na + Cl2 → 2NaCl) را همراه با دلیل نشان می دهد."
  },
  molarMassTutorial: {
    inputTitle: "ورودی فرمول",
    inputDesc: "هر فرمول شیمیایی را اینجا تایپ کنید. ما به عنوان مثال به طور خودکار 'CaCO3' (سنگ آهک) را وارد می کنیم!",
    previewTitle: "پیش نمایش زنده",
    previewDesc: "هنگام تایپ، فرمول با زیرنویس های مناسب در زمان واقعی نمایش داده می شود.",
    scaleTitle: "ترازوی تعاملی",
    scaleDesc: "ترازوی الکترونیکی متحرک می شود تا جرم مولی محاسبه شده را نشان دهد. هر عنصر به صورت یک بلوک سه بعدی ظاهر می شود!",
    receiptTitle: "رسید وزن",
    receiptDesc: "روی 'چاپ رسید' کلیک کنید و یک رسید دقیق بیرون می آید — شامل تعداد اتم های هر عنصر، جرم فردی و مجموع کل.",
    chipsTitle: "نمونه های سریع",
    chipsDesc: "نمی دانید چه چیزی را امتحان کنید؟ روی هر یک از این ترکیبات رایج کلیک کنید تا بلافاصله بارگیری و محاسبه شود."
  },""",
    'ur': """  balancerTutorial: {
    modeTitle: "موڈ سوئچر",
    modeDesc: "کسی موجودہ مساوات کو ریاضیاتی طور پر متوازن کرنے، یا کسی نئے تعامل کی مصنوعات کی ذہانت سے پیش گوئی کرنے کے درمیان سوئچ کریں۔",
    scaleTitle: "طبعی ترازو",
    scaleDesc: "یہ ترازو رد عمل کے دونوں اطراف میں ایٹموں کے وزن اور عدم توازن کو حقیقی وقت میں بصری طور پر ظاہر کرتا ہے۔",
    inputReactantsTitle: "ری ایکٹنٹس",
    inputReactantsDesc: "اپنے کیمیائی فارمولے یہاں درج کریں۔ مثال کے طور پر ہم خود بخود 'Fe + O2' ٹائپ کریں گے!",
    inputProductsTitle: "مصنوعات",
    inputProductsDesc: "اب پروڈکٹ شامل کرتے ہیں۔ ہم 'Fe2O3' ٹائپ کریں گے۔ غور کریں کہ ترازو عدم توازن کو دکھانے کے لیے کتنا فوری رد عمل ظاہر کرتا ہے!",
    autoTitle: "خودکار توازن",
    autoDesc: "کیا آپ اسے دستی طور پر حل نہیں کرنا چاہتے؟ یہاں کلک کریں اور ہمارا الگورتھم فوراً بہترین عدد کے گتانک تلاش کر لے گا۔",
    feedbackTitle: "اسٹیٹس اور کاپی",
    feedbackDesc: "مکمل طور پر متوازن! حتمی مساوات بالکل یہاں ہے۔ آپ اسے براہ راست اپنے کلپ بورڈ میں کاپی کرنے کے لیے کلک کر سکتے ہیں!"
  },
  predictorTutorial: {
    modeTitle: "موڈ سوئچر",
    modeDesc: "ہم اب پیشین گوئی کے موڈ میں ہیں۔ یہ ٹول صرف ری ایکٹنٹس کی بنیاد پر تعامل کی مصنوعات کا تعین کرتا ہے۔",
    inputTitle: "ری ایکٹنٹس",
    inputDesc: "یہاں اپنے تعامل کے ری ایکٹنٹس ٹائپ کریں۔ مثال کے طور پر ہم خود بخود 'Na + Cl2' درج کریں گے۔",
    typeTitle: "تعامل کی قسم",
    typeDesc: "تعامل کی درجہ بندی منتخب کریں۔ ہم انجن کو بتانے کے لیے ترکیب کا انتخاب کریں گے کہ ری ایکٹنٹس کو دوبارہ کیسے ملانا ہے۔",
    predictTitle: "مصنوعات کی پیش گوئی",
    predictDesc: "یہاں (یا اگلا) کلک کریں! انجن مصنوعات کی پیشین گوئی کرے گا، اور پھر آپ کے لیے مکمل مساوات کو خود بخود متوازن کر دے گا۔",
    resultTitle: "ذہین آؤٹ پٹ",
    resultDesc: "یہ رہا آپ کا نتیجہ! یہ پیشین گوئی شدہ پروڈکٹ (NaCl) اور حتمی متوازن مساوات (2Na + Cl2 → 2NaCl) کو استدلال کے ساتھ دکھاتا ہے۔"
  },
  molarMassTutorial: {
    inputTitle: "فارمولہ ان پٹ",
    inputDesc: "کوئی بھی کیمیائی فارمولہ یہاں ٹائپ کریں۔ ہم مثال کے طور پر 'CaCO3' (چونے کا پتھر) خود بخود درج کر دیں گے!",
    previewTitle: "لائیو پیش نظارہ",
    previewDesc: "جیسے جیسے آپ ٹائپ کرتے ہیں، فارمولہ حقیقی وقت میں مناسب سب اسکرپٹس کے ساتھ دکھایا جاتا ہے۔",
    scaleTitle: "انٹرایکٹو ترازو",
    scaleDesc: "الیکٹرانک ترازو حسابی داڑھ کے ماس کو دکھانے کے لیے متحرک ہوتا ہے۔ ہر عنصر 3D بلاک کے طور پر ظاہر ہوتا ہے!",
    receiptTitle: "وزن کی رسید",
    receiptDesc: "'رسید پرنٹ کریں' پر کلک کریں اور ایک تفصیلی رسید نکلتی ہے — جس میں ہر عنصر کے ایٹم کی گنتی، انفرادی ماس اور کل ٹوٹل دکھایا جاتا ہے۔",
    chipsTitle: "فوری مثالیں۔",
    chipsDesc: "نہیں جانتے کہ کیا آزمانا ہے؟ ان عام مرکبات میں سے کسی پر کلک کریں تاکہ وہ فوری طور پر لوڈ اور کیلکولیٹ ہو جائیں۔"
  },""",
    'tl': """  balancerTutorial: {
    modeTitle: "Tagapagpalit ng Mode",
    modeDesc: "Lumipat sa pagitan ng mathematically balancing ng umiiral na equation, o matalinong paghula sa mga produkto ng bagong reaction.",
    scaleTitle: "Pisikal na Timbangan",
    scaleDesc: "Ang timbangang ito ay biswal na nagrerepresenta sa bigat at imbalances ng atoms sa parehong gilid ng reaction in real-time.",
    inputReactantsTitle: "Reactants",
    inputReactantsDesc: "Ilagay ang iyong chemical formulas dito. Panoorin habang awtomatiko naming tina-type ang 'Fe + O2' para sa aming halimbawa!",
    inputProductsTitle: "Produkto",
    inputProductsDesc: "Ngayon idagdag natin ang produkto. Ita-type natin ang 'Fe2O3'. Mapapansin kung paano agad nag-react ang timbangan para ipakita ang imbalance!",
    autoTitle: "Auto-Balance",
    autoDesc: "Ayaw mo itong i-solve nang manu-mano? I-click dito (o susunod) at agad na hahanapin ng algorithm ang pinakamagandang integer coefficients.",
    feedbackTitle: "Status at Kopyahin",
    feedbackDesc: "Perpektong Balanse! Ang final equation ay nandito na. Pwede mong i-click para diretsong makopya sa iyong clipboard!"
  },
  predictorTutorial: {
    modeTitle: "Tagapagpalit ng Mode",
    modeDesc: "Nasa Predict Mode na tayo ngayon. Ang tool na ito ay gumagamit ng talino para alamin ang mga produkto ng isang reaction base lang sa mga reactant.",
    inputTitle: "Reactants",
    inputDesc: "I-type ang mga reactant ng iyong reaction dito. Awtomatiko nating ilalagay ang 'Na + Cl2' para sa ating halimbawa.",
    typeTitle: "Uri ng Reaction",
    typeDesc: "Piliin ang klasipikasyon ng reaction. Pipiliin natin ang Synthesis para sabihin sa engine kung paano pagsasamahin muli ang mga reactant na ito.",
    predictTitle: "Hulaan ang mga Produkto",
    predictDesc: "I-click dito (o susunod)! Huhulaan ng engine ang produkto, at pagkatapos ay awtomatikong iba-balance ang buong equation para sa iyo.",
    resultTitle: "Matalinong Output",
    resultDesc: "Narito ang iyong resulta! Ipinapakita nito ang nahulaang produkto (NaCl) at ang panghuling balanseng equation (2Na + Cl2 → 2NaCl) na may kasamang dahilan."
  },
  molarMassTutorial: {
    inputTitle: "Input ng Formula",
    inputDesc: "I-type ang anumang chemical formula dito. Awtomatiko nating ilalagay ang 'CaCO3' (Limestone) bilang ating halimbawa!",
    previewTitle: "Live na Preview",
    previewDesc: "Habang nagta-type ka, ang formula ay na-re-render na may tamang subscripts in real-time upang makita mo agad.",
    scaleTitle: "Interactive na Timbangan",
    scaleDesc: "Ang electronic scale ay umaandar para ipakita ang kinalkulang molar mass. Bawat elemento ay lumalabas bilang isang 3D block!",
    receiptTitle: "Resibo ng Timbang",
    receiptDesc: "I-click ang 'I-print ang Resibo' at lalabas ang isang detalyadong resibo — ipinapakita ang atom count, sariling mass, at grand total ng bawat elemento.",
    chipsTitle: "Mabilis na Halimbawa",
    chipsDesc: "Hindi alam kung ano ang susubukan? I-click ang alinman sa mga common compound chips na ito para mabilis na mag-load at mag-calculate."
  },"""
}

# Also Farsi translations for the predictor labels
predictor_labels = {
    'en': """      error: "Error",
      selectType: "Please select a reaction type.",
      noReaction: "No Reaction",
      noProducts: "No products formed.",
      unknownError: "Unknown error.",
      predictedProducts: "Predicted Products",
      balancedEquation: "Balanced Equation",
      unbalancedReaction: "Unbalanced Reaction",
      reactionCompleted: "Reaction completed successfully.",
      checkInputAgain: "Please check your input and try again.",
      reasonSynthesisBinary: "Metal ({m}) + nonmetal ({nm}) combine to form an ionic compound.",
""",
    'zh': """      error: "错误",
      selectType: "请选择一个反应类型。",
      noReaction: "无反应",
      noProducts: "未生成任何产物。",
      unknownError: "未知错误。",
      predictedProducts: "预测生成物",
      balancedEquation: "已配平方程式",
      unbalancedReaction: "未配平反应",
      reactionCompleted: "反应预测成功。",
      checkInputAgain: "请检查您的输入后重试。",
      reasonSynthesisBinary: "金属 ({m}) + 非金属 ({nm}) 化合生成离子化合物。",
""",
    'fr': """      error: "Erreur",
      selectType: "Veuillez sélectionner un type de réaction.",
      noReaction: "Aucune Réaction",
      noProducts: "Aucun produit formé.",
      unknownError: "Erreur inconnue.",
      predictedProducts: "PRODUITS PRÉDITS",
      balancedEquation: "ÉQUATION ÉQUILIBRÉE",
      unbalancedReaction: "Réaction Non Équilibrée",
      reactionCompleted: "Réaction complétée avec succès.",
      checkInputAgain: "Veuillez vérifier votre saisie et réessayer.",
      reasonSynthesisBinary: "Le métal ({m}) + le non-métal ({nm}) se combinent pour former un composé ionique.",
""",
    'ru': """    error: "Ошибка",
    selectType: "Пожалуйста, выберите тип реакции.",
    noReaction: "Нет реакции",
    noProducts: "Продукты не образовались.",
    unknownError: "Неизвестная ошибка.",
    predictedProducts: "ПРЕДСКАЗАННЫЕ ПРОДУКТЫ",
    balancedEquation: "СБАЛАНСИРОВАННОЕ УРАВНЕНИЕ",
    unbalancedReaction: "Несбалансированная Реакция",
    reactionCompleted: "Реакция успешно завершена.",
    checkInputAgain: "Пожалуйста, проверьте ваш ввод и попробуйте снова.",
    reasonSynthesisBinary: "Металл ({m}) + неметалл ({nm}) соединяются, образуя ионное соединение.",
""",
    'fa': """    error: "خطا",
    selectType: "لطفا یک نوع واکنش را انتخاب کنید.",
    noReaction: "بدون واکنش",
    noProducts: "هیچ محصولی تشکیل نشد.",
    unknownError: "خطای ناشناخته.",
    predictedProducts: "محصولات پیش بینی شده",
    balancedEquation: "معادله موازنه شده",
    unbalancedReaction: "واکنش موازنه نشده",
    reactionCompleted: "واکنش با موفقیت انجام شد.",
    checkInputAgain: "لطفا ورودی خود را بررسی کرده و دوباره امتحان کنید.",
    reasonSynthesisBinary: "فلز ({m}) + نافلز ({nm}) برای تشکیل یک ترکیب یونی ترکیب می شوند.",
""",
    'ur': """    error: "غلطی",
    selectType: "براہ کرم تعامل کی ایک قسم منتخب کریں۔",
    noReaction: "کوئی تعامل نہیں",
    noProducts: "کوئی مصنوعات نہیں بنیں۔",
    unknownError: "نامعلوم غلطی۔",
    predictedProducts: "پیشین گوئی شدہ مصنوعات",
    balancedEquation: "متوازن مساوات",
    unbalancedReaction: "غیر متوازن تعامل",
    reactionCompleted: "تعامل کامیابی سے مکمل ہو گیا۔",
    checkInputAgain: "براہ کرم اپنا ان پٹ چیک کریں اور دوبارہ کوشش کریں۔",
    reasonSynthesisBinary: "دھات ({m}) + غیر دھات ({nm}) مل کر ایک آئنک مرکب بناتے ہیں۔",
""",
    'tl': """    error: "Error",
    selectType: "Mangyaring pumili ng uri ng reaksyon.",
    noReaction: "Walang Reaksyon",
    noProducts: "Walang nabuong produkto.",
    unknownError: "Hindi kilalang error.",
    predictedProducts: "NAHULAANG PRODUKTO",
    balancedEquation: "BALANSENG EQUATION",
    unbalancedReaction: "Hindi Balanseng Reaksyon",
    reactionCompleted: "Matagumpay na nakumpleto ang reaksyon.",
    checkInputAgain: "Pakisuri ang iyong inilagay at subukang muli.",
    reasonSynthesisBinary: "Ang metal ({m}) + nonmetal ({nm}) ay nagsasama para bumuo ng isang ionic compound.",
"""
}

for lang, text in tutorials_additions.items():
    lang_pattern = re.compile(fr'(translations\.{lang}\s*=\s*deepMerge\(translations\.en,\s*{{)', re.DOTALL)
    match = lang_pattern.search(content)
    if match:
        insert_pos = match.end()
        content = content[:insert_pos] + "\n" + text + content[insert_pos:]

for lang, text in predictor_labels.items():
    if lang in ['en', 'zh', 'fr']:
        # These have `predictor: {` indented by 4 spaces
        pattern = re.compile(fr'(\b{lang}:\s*{{.*?\bpredictor:\s*{{)', re.DOTALL)
        match = pattern.search(content)
        if match:
            insert_pos = match.end()
            content = content[:insert_pos] + "\n" + text + content[insert_pos:]
    else:
        # These have `predictor: {` indented by 2 spaces inside the deepMerge
        pattern = re.compile(fr'(translations\.{lang}\s*=\s*deepMerge\(translations\.en,\s*{{.*?\n  predictor:\s*{{)', re.DOTALL)
        match = pattern.search(content)
        if match:
            insert_pos = match.end()
            content = content[:insert_pos] + "\n" + text + content[insert_pos:]

with open("js/data/translations.js", "w", encoding="utf-8") as f:
    f.write(content)

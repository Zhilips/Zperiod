// ============================================
// Worksheet Generator - Fixed Version
// ============================================

// Reaction Templates Database - Extended
const reactionTemplates = {
    synthesis: [
        { reactants: ['Na', 'Cl2'], products: ['NaCl'], coefficients: [2, 1, 2] },
        { reactants: ['Mg', 'O2'], products: ['MgO'], coefficients: [2, 1, 2] },
        { reactants: ['Fe', 'O2'], products: ['Fe2O3'], coefficients: [4, 3, 2] },
        { reactants: ['Al', 'O2'], products: ['Al2O3'], coefficients: [4, 3, 2] },
        { reactants: ['H2', 'O2'], products: ['H2O'], coefficients: [2, 1, 2] },
        { reactants: ['N2', 'H2'], products: ['NH3'], coefficients: [1, 3, 2] },
        { reactants: ['Ca', 'O2'], products: ['CaO'], coefficients: [2, 1, 2] },
        { reactants: ['K', 'Br2'], products: ['KBr'], coefficients: [2, 1, 2] },
        { reactants: ['Li', 'N2'], products: ['Li3N'], coefficients: [6, 1, 2] },
        { reactants: ['P4', 'O2'], products: ['P4O10'], coefficients: [1, 5, 1] },
        { reactants: ['S', 'O2'], products: ['SO2'], coefficients: [1, 1, 1] },
        { reactants: ['Fe', 'S'], products: ['FeS'], coefficients: [1, 1, 1] },
        { reactants: ['Cu', 'S'], products: ['Cu2S'], coefficients: [2, 1, 1] },
        { reactants: ['Zn', 'Cl2'], products: ['ZnCl2'], coefficients: [1, 1, 1] },
        { reactants: ['Ca', 'N2'], products: ['Ca3N2'], coefficients: [3, 1, 1] },
        { reactants: ['Ba', 'O2'], products: ['BaO'], coefficients: [2, 1, 2] },
        { reactants: ['Sr', 'Cl2'], products: ['SrCl2'], coefficients: [1, 1, 1] },
        { reactants: ['Mg', 'N2'], products: ['Mg3N2'], coefficients: [3, 1, 1] },
        { reactants: ['Al', 'S'], products: ['Al2S3'], coefficients: [2, 3, 1] },
        { reactants: ['Fe', 'Cl2'], products: ['FeCl3'], coefficients: [2, 3, 2] },
        { reactants: ['Sn', 'O2'], products: ['SnO2'], coefficients: [1, 1, 1] },
        { reactants: ['Ti', 'O2'], products: ['TiO2'], coefficients: [1, 1, 1] },
        { reactants: ['Cu', 'O2'], products: ['CuO'], coefficients: [2, 1, 2] },
        { reactants: ['Pb', 'O2'], products: ['PbO'], coefficients: [2, 1, 2] }
    ],
    decomposition: [
        { reactants: ['H2O2'], products: ['H2O', 'O2'], coefficients: [2, 2, 1] },
        { reactants: ['HgO'], products: ['Hg', 'O2'], coefficients: [2, 2, 1] },
        { reactants: ['KClO3'], products: ['KCl', 'O2'], coefficients: [2, 2, 3] },
        { reactants: ['CaCO3'], products: ['CaO', 'CO2'], coefficients: [1, 1, 1] },
        { reactants: ['NaHCO3'], products: ['Na2CO3', 'H2O', 'CO2'], coefficients: [2, 1, 1, 1] },
        { reactants: ['NH4NO3'], products: ['N2O', 'H2O'], coefficients: [1, 1, 2] },
        { reactants: ['Mg(OH)2'], products: ['MgO', 'H2O'], coefficients: [1, 1, 1] },
        { reactants: ['Al2O3'], products: ['Al', 'O2'], coefficients: [2, 4, 3] },
        { reactants: ['PbO2'], products: ['PbO', 'O2'], coefficients: [2, 2, 1] },
        { reactants: ['H2CO3'], products: ['H2O', 'CO2'], coefficients: [1, 1, 1] },
        { reactants: ['Na2CO3'], products: ['Na2O', 'CO2'], coefficients: [1, 1, 1] },
        { reactants: ['BaCO3'], products: ['BaO', 'CO2'], coefficients: [1, 1, 1] },
        { reactants: ['Fe2O3'], products: ['Fe', 'O2'], coefficients: [2, 4, 3] },
        { reactants: ['AgNO3'], products: ['Ag', 'NO2', 'O2'], coefficients: [2, 2, 2, 1] },
        { reactants: ['Pb(NO3)2'], products: ['PbO', 'NO2', 'O2'], coefficients: [2, 2, 4, 1] },
        { reactants: ['Ca(OH)2'], products: ['CaO', 'H2O'], coefficients: [1, 1, 1] },
        { reactants: ['NaNO3'], products: ['NaNO2', 'O2'], coefficients: [2, 2, 1] },
        { reactants: ['KNO3'], products: ['KNO2', 'O2'], coefficients: [2, 2, 1] }
    ],
    'single-replacement': [
        { reactants: ['Zn', 'HCl'], products: ['ZnCl2', 'H2'], coefficients: [1, 2, 1, 1] },
        { reactants: ['Fe', 'CuSO4'], products: ['FeSO4', 'Cu'], coefficients: [1, 1, 1, 1] },
        { reactants: ['Mg', 'HCl'], products: ['MgCl2', 'H2'], coefficients: [1, 2, 1, 1] },
        { reactants: ['Na', 'H2O'], products: ['NaOH', 'H2'], coefficients: [2, 2, 2, 1] },
        { reactants: ['K', 'H2O'], products: ['KOH', 'H2'], coefficients: [2, 2, 2, 1] },
        { reactants: ['Ca', 'H2O'], products: ['Ca(OH)2', 'H2'], coefficients: [1, 2, 1, 1] },
        { reactants: ['Al', 'HCl'], products: ['AlCl3', 'H2'], coefficients: [2, 6, 2, 3] },
        { reactants: ['Zn', 'AgNO3'], products: ['Zn(NO3)2', 'Ag'], coefficients: [1, 2, 1, 2] },
        { reactants: ['Cu', 'AgNO3'], products: ['Cu(NO3)2', 'Ag'], coefficients: [1, 2, 1, 2] },
        { reactants: ['Fe', 'HCl'], products: ['FeCl2', 'H2'], coefficients: [1, 2, 1, 1] },
        { reactants: ['Mg', 'H2SO4'], products: ['MgSO4', 'H2'], coefficients: [1, 1, 1, 1] },
        { reactants: ['Li', 'H2O'], products: ['LiOH', 'H2'], coefficients: [2, 2, 2, 1] },
        { reactants: ['Al', 'Fe2O3'], products: ['Al2O3', 'Fe'], coefficients: [2, 1, 1, 2] },
        { reactants: ['Zn', 'CuCl2'], products: ['ZnCl2', 'Cu'], coefficients: [1, 1, 1, 1] },
        { reactants: ['Fe', 'H2SO4'], products: ['FeSO4', 'H2'], coefficients: [1, 1, 1, 1] },
        { reactants: ['Mg', 'CuSO4'], products: ['MgSO4', 'Cu'], coefficients: [1, 1, 1, 1] },
        { reactants: ['Ca', 'HCl'], products: ['CaCl2', 'H2'], coefficients: [1, 2, 1, 1] },
        { reactants: ['Ba', 'H2O'], products: ['Ba(OH)2', 'H2'], coefficients: [1, 2, 1, 1] },
        { reactants: ['Sr', 'H2O'], products: ['Sr(OH)2', 'H2'], coefficients: [1, 2, 1, 1] },
        { reactants: ['Al', 'CuSO4'], products: ['Al2(SO4)3', 'Cu'], coefficients: [2, 3, 1, 3] }
    ],
    combustion: [
        { reactants: ['CH4', 'O2'], products: ['CO2', 'H2O'], coefficients: [1, 2, 1, 2] },
        { reactants: ['C2H6', 'O2'], products: ['CO2', 'H2O'], coefficients: [2, 7, 4, 6] },
        { reactants: ['C3H8', 'O2'], products: ['CO2', 'H2O'], coefficients: [1, 5, 3, 4] },
        { reactants: ['C4H10', 'O2'], products: ['CO2', 'H2O'], coefficients: [2, 13, 8, 10] },
        { reactants: ['C2H5OH', 'O2'], products: ['CO2', 'H2O'], coefficients: [1, 3, 2, 3] },
        { reactants: ['C6H12O6', 'O2'], products: ['CO2', 'H2O'], coefficients: [1, 6, 6, 6] },
        { reactants: ['C2H2', 'O2'], products: ['CO2', 'H2O'], coefficients: [2, 5, 4, 2] },
        { reactants: ['C6H6', 'O2'], products: ['CO2', 'H2O'], coefficients: [2, 15, 12, 6] },
        { reactants: ['CH3OH', 'O2'], products: ['CO2', 'H2O'], coefficients: [2, 3, 2, 4] },
        { reactants: ['C5H12', 'O2'], products: ['CO2', 'H2O'], coefficients: [1, 8, 5, 6] },
        { reactants: ['C2H4', 'O2'], products: ['CO2', 'H2O'], coefficients: [1, 3, 2, 2] },
        { reactants: ['C3H6', 'O2'], products: ['CO2', 'H2O'], coefficients: [2, 9, 6, 6] },
        { reactants: ['C7H16', 'O2'], products: ['CO2', 'H2O'], coefficients: [1, 11, 7, 8] },
        { reactants: ['C8H18', 'O2'], products: ['CO2', 'H2O'], coefficients: [2, 25, 16, 18] },
        { reactants: ['C3H4', 'O2'], products: ['CO2', 'H2O'], coefficients: [1, 4, 3, 2] },
        { reactants: ['C4H8', 'O2'], products: ['CO2', 'H2O'], coefficients: [1, 6, 4, 4] },
        { reactants: ['C6H14', 'O2'], products: ['CO2', 'H2O'], coefficients: [2, 19, 12, 14] },
        { reactants: ['C10H22', 'O2'], products: ['CO2', 'H2O'], coefficients: [2, 31, 20, 22] }
    ],
    'double-replacement': [
        // 酸碱中和
        { reactants: ['HCl', 'NaOH'], products: ['NaCl', 'H2O'], coefficients: [1, 1, 1, 1] },
        { reactants: ['H2SO4', 'NaOH'], products: ['Na2SO4', 'H2O'], coefficients: [1, 2, 1, 2] },
        { reactants: ['HNO3', 'KOH'], products: ['KNO3', 'H2O'], coefficients: [1, 1, 1, 1] },
        { reactants: ['H2SO4', 'KOH'], products: ['K2SO4', 'H2O'], coefficients: [1, 2, 1, 2] },
        { reactants: ['HCl', 'Ca(OH)2'], products: ['CaCl2', 'H2O'], coefficients: [2, 1, 1, 2] },
        { reactants: ['H2SO4', 'Ca(OH)2'], products: ['CaSO4', 'H2O'], coefficients: [1, 1, 1, 2] },
        { reactants: ['HCl', 'Ba(OH)2'], products: ['BaCl2', 'H2O'], coefficients: [2, 1, 1, 2] },
        { reactants: ['H3PO4', 'NaOH'], products: ['Na3PO4', 'H2O'], coefficients: [1, 3, 1, 3] },
        { reactants: ['H2CO3', 'NaOH'], products: ['Na2CO3', 'H2O'], coefficients: [1, 2, 1, 2] },
        // 沉淀反应
        { reactants: ['AgNO3', 'NaCl'], products: ['AgCl', 'NaNO3'], coefficients: [1, 1, 1, 1] },
        { reactants: ['BaCl2', 'Na2SO4'], products: ['BaSO4', 'NaCl'], coefficients: [1, 1, 1, 2] },
        { reactants: ['Pb(NO3)2', 'KI'], products: ['PbI2', 'KNO3'], coefficients: [1, 2, 1, 2] },
        { reactants: ['CaCl2', 'Na2CO3'], products: ['CaCO3', 'NaCl'], coefficients: [1, 1, 1, 2] },
        { reactants: ['FeCl3', 'NaOH'], products: ['Fe(OH)3', 'NaCl'], coefficients: [1, 3, 1, 3] },
        { reactants: ['CuSO4', 'NaOH'], products: ['Cu(OH)2', 'Na2SO4'], coefficients: [1, 2, 1, 1] },
        { reactants: ['AgNO3', 'K2CrO4'], products: ['Ag2CrO4', 'KNO3'], coefficients: [2, 1, 1, 2] },
        { reactants: ['MgCl2', 'NaOH'], products: ['Mg(OH)2', 'NaCl'], coefficients: [1, 2, 1, 2] },
        { reactants: ['ZnSO4', 'NaOH'], products: ['Zn(OH)2', 'Na2SO4'], coefficients: [1, 2, 1, 1] },
        { reactants: ['AlCl3', 'NaOH'], products: ['Al(OH)3', 'NaCl'], coefficients: [1, 3, 1, 3] },
        // 气体生成
        { reactants: ['Na2CO3', 'HCl'], products: ['NaCl', 'H2O', 'CO2'], coefficients: [1, 2, 2, 1, 1] },
        { reactants: ['CaCO3', 'HCl'], products: ['CaCl2', 'H2O', 'CO2'], coefficients: [1, 2, 1, 1, 1] },
        { reactants: ['NaHCO3', 'HCl'], products: ['NaCl', 'H2O', 'CO2'], coefficients: [1, 1, 1, 1, 1] },
        { reactants: ['Na2S', 'HCl'], products: ['NaCl', 'H2S'], coefficients: [1, 2, 2, 1] },
        { reactants: ['NH4Cl', 'NaOH'], products: ['NaCl', 'H2O', 'NH3'], coefficients: [1, 1, 1, 1, 1] },
        { reactants: ['(NH4)2SO4', 'NaOH'], products: ['Na2SO4', 'H2O', 'NH3'], coefficients: [1, 2, 1, 2, 2] }
    ]
};

// Worksheet state
let currentWorksheet = null;
let currentViewMode = 'student';
let worksheetDate = '';
let userAnswers = {};

const WORKSHEET_PHRASE_MAP = {
    'Please select at least one reaction type': {
        'zh-Hant': '請至少選擇一種反應類型',
        fr: 'Veuillez selectionner au moins un type de reaction',
        ru: 'Пожалуйста, выберите хотя бы один тип реакции',
        fa: 'لطفا حداقل یک نوع واکنش را انتخاب کنید',
        ur: 'براہ کرم کم از کم ایک قسم کا ردعمل منتخب کریں',
        tl: 'Pumili ng kahit isang uri ng reaksyon'
    },
    'Answer Key': {
        'zh-Hant': '答案',
        fr: 'Corrige',
        ru: 'Ответы',
        fa: 'پاسخنامه',
        ur: 'جوابات',
        tl: 'Susi ng Sagot'
    },
    'Online Practice': {
        'zh-Hant': '線上練習',
        fr: 'Exercice en ligne',
        ru: 'Онлайн-практика',
        fa: 'تمرین آنلاین',
        ur: 'آن لائن مشق',
        tl: 'Online na Pagsasanay'
    },
    'Balancing Chemical Equations': {
        'zh-Hant': '化學方程式配平練習',
        fr: 'Equilibrage des equations chimiques',
        ru: 'Балансировка химических уравнений',
        fa: 'موازنه معادلات شیمیایی',
        ur: 'کیمیائی مساوات کو متوازن کرنا',
        tl: 'Pagbabalanse ng mga Kemikal na Ekweisyon'
    },
    'Fill in the coefficients and click Check.': {
        'zh-Hant': '填入係數後點擊檢查。',
        fr: 'Remplissez les coefficients puis cliquez sur Verifier.',
        ru: 'Введите коэффициенты и нажмите Проверить.',
        fa: 'ضرایب را وارد کنید و روی بررسی کلیک کنید.',
        ur: 'ضریب درج کریں اور چیک پر کلک کریں۔',
        tl: 'Ilagay ang coefficients at i-click ang Suriin.'
    },
    'Balance the equations by filling in the coefficients.': {
        'zh-Hant': '配平方程式，在空格內填入係數。',
        fr: 'Equilibrez les equations en remplissant les coefficients.',
        ru: 'Сбалансируйте уравнения, вписав коэффициенты.',
        fa: 'با نوشتن ضرایب، معادلات را موازنه کنید.',
        ur: 'ضریب بھر کر مساوات کو متوازن کریں۔',
        tl: 'I-balance ang mga ekwasyon sa pamamagitan ng paglalagay ng coefficients.'
    },
    Easy: {
        'zh-Hant': '簡單',
        fr: 'Facile',
        ru: 'Легко',
        fa: 'آسان',
        ur: 'آسان',
        tl: 'Madali'
    },
    Medium: {
        'zh-Hant': '中等',
        fr: 'Moyen',
        ru: 'Средне',
        fa: 'متوسط',
        ur: 'درمیانہ',
        tl: 'Katamtaman'
    },
    Hard: {
        'zh-Hant': '困難',
        fr: 'Difficile',
        ru: 'Сложно',
        fa: 'سخت',
        ur: 'مشکل',
        tl: 'Mahirap'
    },
    Synthesis: {
        'zh-Hant': '合成',
        fr: 'Synthese',
        ru: 'Синтез',
        fa: 'ترکیب',
        ur: 'ترکیب',
        tl: 'Sintesis'
    },
    Decomp: {
        'zh-Hant': '分解',
        fr: 'Decomposition',
        ru: 'Разложение',
        fa: 'تجزیه',
        ur: 'تجزیہ',
        tl: 'Pagkabulok'
    },
    'Single Rep': {
        'zh-Hant': '單取代',
        fr: 'Substitution simple',
        ru: 'Одиночное замещение',
        fa: 'جانشینی تکی',
        ur: 'سنگل ریپلیسمنٹ',
        tl: 'Single Replacement'
    },
    'Double Rep': {
        'zh-Hant': '復分解',
        fr: 'Double substitution',
        ru: 'Двойное замещение',
        fa: 'جانشینی دوگانه',
        ur: 'ڈبل ریپلیسمنٹ',
        tl: 'Double Replacement'
    },
    Combustion: {
        'zh-Hant': '燃燒',
        fr: 'Combustion',
        ru: 'Горение',
        fa: 'احتراق',
        ur: 'کمبسشن',
        tl: 'Pagsunog'
    },
    questions: {
        'zh-Hant': '題',
        fr: 'questions',
        ru: 'вопросов',
        fa: 'پرسش',
        ur: 'سوالات',
        tl: 'tanong'
    },
    Name: {
        'zh-Hant': '姓名',
        fr: 'Nom',
        ru: 'Имя',
        fa: 'نام',
        ur: 'نام',
        tl: 'Pangalan'
    },
    Date: {
        'zh-Hant': '日期',
        fr: 'Date',
        ru: 'Дата',
        fa: 'تاریخ',
        ur: 'تاریخ',
        tl: 'Petsa'
    },
    Score: {
        'zh-Hant': '得分',
        fr: 'Score',
        ru: 'Оценка',
        fa: 'امتیاز',
        ur: 'اسکور',
        tl: 'Iskor'
    },
    Check: {
        'zh-Hant': '檢查',
        fr: 'Verifier',
        ru: 'Проверить',
        fa: 'بررسی',
        ur: 'چیک',
        tl: 'Suriin'
    },
    'Generated by Zperiod': {
        'zh-Hant': '由 Zperiod 生成',
        fr: 'Genere par Zperiod',
        ru: 'Сгенерировано в Zperiod',
        fa: 'تولید شده توسط Zperiod',
        ur: 'Zperiod کی جانب سے تیار کردہ',
        tl: 'Nabuo ng Zperiod'
    }
};

// Translation helper
function tr(en, zh) {
    const lang = (document.documentElement.lang || 'en').toLowerCase();
    if (lang.startsWith('zh')) return zh;
    const translated = WORKSHEET_PHRASE_MAP[en]?.[lang] || WORKSHEET_PHRASE_MAP[en]?.[lang.split('-')[0]];
    return translated || en;
}

// Initialize Worksheet Generator
function initWorksheetGenerator() {
    // Button group handlers
    document.querySelectorAll('.worksheet-controls .button-group').forEach(group => {
        group.querySelectorAll('.option-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                group.querySelectorAll('.option-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });
    });

    // Preview tab handlers
    document.querySelectorAll('.preview-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.preview-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            currentViewMode = tab.dataset.mode;
            if (currentWorksheet) {
                renderWorksheet(currentWorksheet, currentViewMode);
            }
        });
    });

    // Generate button
    const generateBtn = document.getElementById('generate-worksheet-btn');
    if (generateBtn) {
        generateBtn.addEventListener('click', generateWorksheet);
    }

    // Fill date button
    const fillDateBtn = document.getElementById('fill-date-btn');
    if (fillDateBtn) {
        fillDateBtn.addEventListener('click', fillTodayDate);
    }

}

// Fill today's date (Toggle)
function fillTodayDate() {
    if (!currentWorksheet) return;

    if (currentWorksheet.date) {
        // If date exists, clear it (Toggle OFF)
        currentWorksheet.date = '';
        worksheetDate = '';
    } else {
        // If date is empty, fill it (Toggle ON)
        const today = new Date();
        const lang = (document.documentElement.lang || 'en').toLowerCase();

        if (lang.startsWith('zh')) {
            worksheetDate = `${today.getFullYear()}年${today.getMonth() + 1}月${today.getDate()}日`;
        } else {
            worksheetDate = today.toLocaleDateString(lang, { year: 'numeric', month: 'short', day: 'numeric' });
        }
        currentWorksheet.date = worksheetDate;
    }

    renderWorksheet(currentWorksheet, currentViewMode);
}

// Helper to estimate difficulty score
function getReactionDifficulty(r) {
    let score = 1.5; // Base
    const coeffSum = r.coefficients.reduce((a, b) => a + b, 0);
    const hasParen = r.reactants.some(f => f.includes('(')) || r.products.some(f => f.includes('('));

    // Typology weights
    if (r.type === 'combustion') score += 2;
    else if (r.type === 'single-replacement') score += 1;
    else if (r.type === 'decomposition') score += 0.5;

    // Structure weights
    if (hasParen) score += 1;
    if (coeffSum > 12) score += 1;
    if (coeffSum <= 5) score -= 0.5;

    return score;
}

// Generate worksheet
function generateWorksheet() {
    const countGroup = document.getElementById('question-count-group');
    const count = parseInt(countGroup?.querySelector('.option-btn.active')?.dataset?.value || 10);

    const typesGroup = document.getElementById('reaction-types-group');
    const selectedTypes = [];
    typesGroup?.querySelectorAll('input[type="checkbox"]:checked').forEach(cb => {
        selectedTypes.push(cb.value);
    });

    // Difficulty
    const difficultyGroup = document.getElementById('difficulty-group');
    const difficultyBtn = difficultyGroup?.querySelector('.option-btn.active');
    const difficulty = difficultyBtn ? difficultyBtn.dataset.value : 'medium';

    if (selectedTypes.length === 0) {
        alert(tr('Please select at least one reaction type', '请至少选择一种反应类型'));
        return;
    }

    // 1. Collect and Score all potential reactions
    let allReactions = [];
    selectedTypes.forEach(type => {
        if (reactionTemplates[type]) {
            reactionTemplates[type].forEach(reaction => {
                allReactions.push({
                    ...reaction,
                    type,
                    diffScore: getReactionDifficulty({ ...reaction, type })
                });
            });
        }
    });

    // 2. Define pool based on difficulty
    // Easy: < 2.5
    // Medium: 1.5 - 3.5
    // Hard: > 2.5
    let primaryPool = [];
    let mediumPool = []; // For Hard mix-in

    allReactions.forEach(r => {
        const s = r.diffScore;
        // Categorize for fallback/mixing
        if (s >= 1.5 && s <= 3.5) mediumPool.push(r);

        // Filter for primary selection
        if (difficulty === 'easy' && s <= 2.5) primaryPool.push(r);
        else if (difficulty === 'medium' && s >= 1.5 && s <= 4.0) primaryPool.push(r);
        else if (difficulty === 'hard' && s >= 2.5) primaryPool.push(r);
    });

    // Fallback: If primary pool is too small, use all reactions of selected types
    if (primaryPool.length < count) {
        primaryPool = allReactions;
    }

    // 3. Selection Logic (Uniform Distribution)
    let finalQuestions = [];
    const questionsNeeded = count;

    // Special Logic: Hard Mode + Low Count (Mix in Medium)
    let mediumMixCount = 0;
    if (difficulty === 'hard' && count <= 10) {
        mediumMixCount = Math.max(1, Math.floor(count * 0.2)); // 1-2 questions
    }

    const primaryCount = questionsNeeded - mediumMixCount;

    // Distribute primary quota per type
    const quotaPerType = Math.ceil(primaryCount / selectedTypes.length);
    let selectedSoFar = 0;

    // Scramble pools
    shuffleArray(primaryPool);
    shuffleArray(mediumPool);

    // Select Primary
    selectedTypes.forEach(type => {
        if (selectedSoFar >= primaryCount) return;

        // Get candidates of this type from primaryPool
        const typeCandidates = primaryPool.filter(r => r.type === type);

        // Take quota
        const take = Math.min(quotaPerType, typeCandidates.length, primaryCount - selectedSoFar);

        // Add unique checks could be complex, but for now just slice
        // Since we reshuffle primaryPool every gen, just taking from filter matches works IF we remove them?
        // Simpler: Just filter primaryPool, shuffle, and pick
        // But we want uniform distribution.

        // Let's just pick 'take' items from typeCandidates
        // Note: duplicates across different generations are fine, but within one worksheet?
        // reactionTemplates are unique.

        finalQuestions.push(...typeCandidates.slice(0, take));
        selectedSoFar += take;
    });

    // If still need more (due to some types having few valid qs), fill from remainder of primaryPool
    if (finalQuestions.length < primaryCount) {
        const remainingNeeded = primaryCount - finalQuestions.length;
        const usedIds = new Set(finalQuestions.map(q => JSON.stringify(q.reactants)));
        const others = primaryPool.filter(q => !usedIds.has(JSON.stringify(q.reactants)));
        finalQuestions.push(...others.slice(0, remainingNeeded));
    }

    // Repeat if still not enough (very rare unless count > DB size)
    while (finalQuestions.length < primaryCount) {
        finalQuestions.push(primaryPool[Math.floor(Math.random() * primaryPool.length)]);
    }

    // Select Medium Mix-in (for Hard/Low mode)
    if (mediumMixCount > 0) {
        // Ensure no duplicates logic... simplified for now
        let mixed = 0;
        for (let r of mediumPool) {
            if (mixed >= mediumMixCount) break;
            // Avoid dupe
            if (!finalQuestions.includes(r)) { // Ref check might fail if object recreated, but here references are from same pool? No, strict mode used refs from pool.
                finalQuestions.push(r);
                mixed++;
            }
        }
    }

    // Final Shuffle
    shuffleArray(finalQuestions);

    const worksheetId = generateWorksheetId();

    // Reset date to empty logic
    worksheetDate = '';

    currentWorksheet = {
        id: worksheetId,
        date: worksheetDate,
        questions: finalQuestions,
        types: selectedTypes,
        difficulty: difficulty,
        totalCount: count
    };

    userAnswers = {};

    const fillDateBtn = document.getElementById('fill-date-btn');
    if (fillDateBtn) fillDateBtn.disabled = false;

    renderWorksheet(currentWorksheet, currentViewMode);
}

// Render worksheet
function renderWorksheet(worksheet, mode) {
    const container = document.getElementById('worksheet-preview-content');
    if (!container) return;

    const isAnswerKey = mode === 'answer';
    const isPractice = mode === 'practice';

    let title;
    if (isAnswerKey) {
        title = tr('Answer Key', '答案');
    } else if (isPractice) {
        title = tr('Online Practice', '在线练习');
    } else {
        title = tr('Balancing Chemical Equations', '化学方程式配平练习');
    }

    const instructions = isPractice
        ? tr('Fill in the coefficients and click Check.', '填入系数后点击检查。')
        : tr('Balance the equations by filling in the coefficients.', '配平方程式，在空格内填入系数。');

    // Generate Summary String
    // Ex: "20 questions · Medium · Synthesis, Decomposition"
    const diffLabel = {
        'easy': tr('Easy', '简单'),
        'medium': tr('Medium', '中等'),
        'hard': tr('Hard', '困难')
    }[worksheet.difficulty] || worksheet.difficulty;

    const typesLabel = worksheet.types.map(t => {
        const map = {
            'synthesis': tr('Synthesis', '合成'),
            'decomposition': tr('Decomp', '分解'),
            'single-replacement': tr('Single Rep', '单取代'),
            'double-replacement': tr('Double Rep', '复分解'),
            'combustion': tr('Combustion', '燃烧')
        };
        return map[t] || t;
    }).join(', ');

    const summaryHtml = `
        <div class="preview-summary-bar">
            <span>${worksheet.questions.length} ${tr('questions', '题')}</span>
            <span style="opacity:0.6;">•</span>
            <span>${diffLabel}</span>
            <span style="opacity:0.6;">•</span>
            <span style="font-size: 0.75rem; opacity: 0.9;">${typesLabel}</span>
        </div>
    `;

    let html = `
        <div class="worksheet-paper ${isAnswerKey ? 'answer-key' : ''} ${isPractice ? 'practice-mode' : ''}">
            ${summaryHtml}
            <div class="worksheet-header">
                <div class="header-top">
                    <h1>${title}</h1>
                    <span class="worksheet-id-badge">#${worksheet.id}</span>
                </div>
                ${!isPractice ? `
                <div class="header-fields">
                    <div class="field-group">
                        <span class="field-label">${tr('Name', '姓名')}:</span>
                        <span class="field-line"></span>
                    </div>
                    <div class="field-group">
                        <span class="field-label">${tr('Date', '日期')}:</span>
                        ${worksheet.date ? `<span class="field-value">${worksheet.date}</span>` : `<span class="field-line"></span>`}
                    </div>
                    <div class="field-group">
                        <span class="field-label">${tr('Score', '得分')}:</span>
                        <span class="field-line short"></span>
                        <span class="score-total">/${worksheet.questions.length}</span>
                    </div>
                </div>
                ` : ''}
                <p class="instructions">${instructions}</p>
            </div>
            <div class="questions-grid">
    `;

    worksheet.questions.forEach((q, index) => {
        const equationHtml = formatEquation(q, isAnswerKey, isPractice, index);
        const resultClass = userAnswers[index] !== undefined
            ? (checkSingleAnswer(index) ? 'correct' : 'incorrect')
            : '';
        html += `
            <div class="question-row ${resultClass}" data-question="${index}">
                <span class="q-num">${index + 1}.</span>
                <div class="q-equation">${equationHtml}</div>
                ${isPractice && userAnswers[index] !== undefined ? `
                    <span class="result-icon">${checkSingleAnswer(index) ? '✓' : '✗'}</span>
                ` : ''}
            </div>
        `;
    });

    html += `</div>`;

    if (isPractice) {
        const correctCount = Object.keys(userAnswers).length > 0
            ? worksheet.questions.filter((_, i) => checkSingleAnswer(i)).length
            : 0;
        const totalAnswered = Object.keys(userAnswers).length;

        html += `
            <div class="practice-actions">
                <button class="check-btn" id="check-answers-btn">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    ${tr('Check', '检查')}
                </button>
                ${totalAnswered > 0 ? `
                <div class="score-display">
                    <span class="score-value ${correctCount === worksheet.questions.length ? 'perfect' : ''}">${correctCount}/${worksheet.questions.length}</span>
                </div>
                ` : ''}
            </div>
        `;
    }

    html += `
            <div class="worksheet-footer">
                <span>${tr('Generated by Zperiod', '由 Zperiod 生成')}</span>
            </div>
        </div>
    `;

    container.innerHTML = html;

    // Event listeners for practice mode
    if (isPractice) {
        container.querySelectorAll('.coef-input').forEach(input => {
            input.addEventListener('input', (e) => {
                const qIndex = parseInt(e.target.dataset.question);
                const cIndex = parseInt(e.target.dataset.coef);
                if (!userAnswers[qIndex]) userAnswers[qIndex] = [];
                userAnswers[qIndex][cIndex] = parseInt(e.target.value) || 0;
            });

            input.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    const inputs = container.querySelectorAll('.coef-input');
                    const currentIndex = Array.from(inputs).indexOf(e.target);
                    if (currentIndex < inputs.length - 1) {
                        inputs[currentIndex + 1].focus();
                    }
                }
            });
        });

        const checkBtn = document.getElementById('check-answers-btn');
        if (checkBtn) {
            checkBtn.addEventListener('click', () => {
                container.querySelectorAll('.coef-input').forEach(input => {
                    const qIndex = parseInt(input.dataset.question);
                    const cIndex = parseInt(input.dataset.coef);
                    if (!userAnswers[qIndex]) userAnswers[qIndex] = [];
                    userAnswers[qIndex][cIndex] = parseInt(input.value) || 0;
                });
                renderWorksheet(worksheet, 'practice');
            });
        }
    }
}

function checkSingleAnswer(questionIndex) {
    if (!currentWorksheet || !userAnswers[questionIndex]) return false;
    const question = currentWorksheet.questions[questionIndex];
    const userCoefs = userAnswers[questionIndex];
    return question.coefficients.every((coef, i) => userCoefs[i] === coef);
}

function formatEquation(reaction, showAnswers, isPractice, questionIndex) {
    const { reactants, products, coefficients } = reaction;
    let html = '';
    let coeffIndex = 0;

    reactants.forEach((r, i) => {
        if (i > 0) html += '<span class="plus">+</span>';
        const coef = coefficients[coeffIndex];
        const userVal = userAnswers[questionIndex]?.[coeffIndex] || '';
        const isCorrect = userAnswers[questionIndex] && userAnswers[questionIndex][coeffIndex] === coef;

        if (showAnswers) {
            html += `<span class="coef filled">${coef}</span>`;
        } else if (isPractice) {
            const inputClass = userAnswers[questionIndex] !== undefined ? (isCorrect ? 'correct' : 'incorrect') : '';
            html += `<input type="number" class="coef-input ${inputClass}" data-question="${questionIndex}" data-coef="${coeffIndex}" value="${userVal}" min="1" max="99">`;
        } else {
            html += `<span class="coef blank">__</span>`;
        }
        html += `<span class="formula">${formatFormula(r)}</span>`;
        coeffIndex++;
    });

    html += '<span class="arrow">→</span>';

    products.forEach((p, i) => {
        if (i > 0) html += '<span class="plus">+</span>';
        const coef = coefficients[coeffIndex];
        const userVal = userAnswers[questionIndex]?.[coeffIndex] || '';
        const isCorrect = userAnswers[questionIndex] && userAnswers[questionIndex][coeffIndex] === coef;

        if (showAnswers) {
            html += `<span class="coef filled">${coef}</span>`;
        } else if (isPractice) {
            const inputClass = userAnswers[questionIndex] !== undefined ? (isCorrect ? 'correct' : 'incorrect') : '';
            html += `<input type="number" class="coef-input ${inputClass}" data-question="${questionIndex}" data-coef="${coeffIndex}" value="${userVal}" min="1" max="99">`;
        } else {
            html += `<span class="coef blank">__</span>`;
        }
        html += `<span class="formula">${formatFormula(p)}</span>`;
        coeffIndex++;
    });

    return html;
}

function formatFormula(formula) {
    return formula.replace(/(\d+)/g, '<sub>$1</sub>');
}

function generateWorksheetId() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let id = '';
    for (let i = 0; i < 6; i++) {
        id += chars[Math.floor(Math.random() * chars.length)];
    }
    return id;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Initialize on load (supports lazy-loaded script after DOMContentLoaded)
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initWorksheetGenerator();
    });
} else {
    initWorksheetGenerator();
}

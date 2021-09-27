const divWithAllBtns = document.querySelector('.creator--form-btns');
const allBtns = document.querySelectorAll('.btn')
const allInput = document.querySelectorAll('.input');
const allCheckbox = document.querySelectorAll('.checkbox');
const liveEffectMainData = document.querySelector('.creator--main-data');
const pdfWrapper = document.querySelector('.pdf--wrapper');


//clear data from the form
const removeValueInput = () => {
    allCheckbox.forEach(checkbox => {
        checkbox.checked = false;
    });
    allInput.forEach(input => {
        if (input.id == 'creator--form-year') {
            input.value = '2021';
        } else if (input.id == 'creator--form-month') {
            input.value = input.value;
            console.log(input.value)
        } else {
            input.value = '';
        }
    });
};

//start over 
const startOver = () => {
    if (confirm('Ta czynność spowoduje usunięcie wszytstkich danych. Czy nadal jesteś pewien?')) {
        window.location.reload();
    } else {
        return
    };
};

//validator 
const validator = () => {
    let bolen = false;
    allInput.forEach(input => {
        if (input.value === '') {
            input.classList.add('feedback');
            setTimeout(() => {
                input.classList.remove('feedback')
            }, 3000)
            bolen = false;
        } else {
            bolen = true;
        };
    });
    return bolen;
};


//create class to data
class CreateObjData {
    month;
    year;
    date;
    time;
    location;
    chairman;
    groupCollection;
    dataZoom;
    constructor(month, year, date, time, location, chairman, groupCollection, dataZoom) {
        this.month = month;
        this.year = year;
        this.date = date;
        this.time = time;
        this.location = location;
        this.chairman = chairman;
        this.groupCollection = groupCollection;
        this.dataZoom = dataZoom;
    };
};


//add
const add = () => {
    let allData = [];
    allInput.forEach(input => {
        allData.push(input.value);
    });

    allCheckbox.forEach(checkbox => {
        allData.push(checkbox.checked)
    });

    const dataObj = new CreateObjData(...allData);

    
    console.log(dataObj);
   
    
    writeDataToPdf(dataObj);
    writeDataToLiveEffect(dataObj);

    allData = [];
};


//function to write data to live effect
const writeDataToLiveEffect = (data) => {
    const liveEffectMonth = document.querySelector('.live_effect-month');
    const liveEffectYear = document.querySelector('.live_effect-year');

    liveEffectMonth.innerText = data.month;
    liveEffectYear.innerText = data.year;

    const p = document.createElement('p');
    if (data.dataZoom == true) {
        data.location = 'zoom(dane zooma)';
    }
    if (data.groupCollection == true) {
        p.innerText = `${data.date} -- słuzba w grupach`;
        liveEffectMainData.appendChild(p);
        return
    }
    p.innerText = `${data.date} -- ${data.time} -- ${data.location} -- ${data.chairman}`;
    liveEffectMainData.appendChild(p);
};


//function to write data to pdf
const writeDataToPdf = (data) => {
    const pdfContent = document.querySelector('.pdf--content');
    const monthYear = document.querySelector('.month-year');
    const spacerTwo = document.createElement('div');
    const spanDate = document.createElement('span');
    
    monthYear.innerText = `${data.month}/${data.year}`;
    spanDate.innerText = data.date;
    
    spacerTwo.classList.add('spacer--2');
    spanDate.classList.add('date');

    pdfContent.appendChild(spacerTwo);
    
    if (data.groupCollection == false) {
        const pdfContentRow = document.createElement('div');
        const spanTime = document.createElement('span');
        const spanPlace = document.createElement('span');
        const spanChairman = document.createElement('span');
        
        pdfContentRow.classList.add('pdf--content-row');
        spanTime.classList.add('time');
        spanPlace.classList.add('place');
        spanChairman.classList.add('chairman');
        
        spanTime.innerText = data.time;
        spanPlace.innerText = data.location;
        spanChairman.innerText = data.chairman;
        
        pdfContent.appendChild(pdfContentRow);
        pdfContentRow.appendChild(spanDate);
        pdfContentRow.appendChild(spanTime);
        pdfContentRow.appendChild(spanPlace);
        pdfContentRow.appendChild(spanChairman);
        
        if (data.dataZoom == true) {
            data.location.innerText = 'zoom';
            console.log(data.location)

            const spanAsterisk = document.createElement('span');
            spanAsterisk.innerText = '*';
            spanAsterisk.classList.add('asterisk');
            spanPlace.appendChild(spanAsterisk);

            const pdfFooterZoom = document.querySelector('.pdf--footer-zoom');
            pdfFooterZoom.innerText = '* dane do spotkania na zoomie: ID: 000 000 000 hasło: -';
        };
    } else {
        const pdfContentRowSaturday = document.createElement('div');
        const spanDescription = document.createElement('span');

        pdfContentRowSaturday.classList.add('pdf--content-row_saturday');
        spanDescription.classList.add('description');

        spanDescription.innerText = 'słuzba w grupach';

        pdfContent.appendChild(pdfContentRowSaturday);
        pdfContentRowSaturday.appendChild(spanDate);
        pdfContentRowSaturday.appendChild(spanDescription);
    };
};


//function to show effect
const showEffect = () => {
    allBtns.forEach(btn => {
        if(btn.innerText == 'zobacz efekt'){
           pdfWrapper.style.display= "flex"
        };
    });
};


//function render pdf
const renderPdf = () => {
    const pdf = document.querySelector('.pdf')
    html2pdf(pdf);
};
// lisener all btns
divWithAllBtns.addEventListener('click', (e) => {

    switch (e.target.innerText) {
        case 'zacznij od nowa':
            startOver();
            break;
        case 'wymaż':
            removeValueInput();
            break;
        case 'dodaj':
            validator();
            if (validator() == true) {
                add();
                removeValueInput();
            };
            break;
        case 'zobacz efekt':
            showEffect();
            break;
        case 'zakończ':
            renderPdf();
            break;

        default:
            break;
    };

});
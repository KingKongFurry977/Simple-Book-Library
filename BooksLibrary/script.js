let submit = document.getElementById('submit');
let change = document.getElementById('change');
let suc = document.getElementById('success');
let err = document.getElementById('error');
let btn1 = document.getElementById('btn1');
let btn2 = document.getElementById('btn2');
let session1 = document.getElementById('session1');
let session2 = document.getElementById('session2');


btn2.style.display = 'none';
session1.style.display = 'none';
session2.style.display = 'none';
suc.style.display = 'none';
err.style.display = 'none';

btn1.addEventListener('click', () => {
    btn2.style.display = 'block';
    session1.style.display = 'block';
    session2.style.display = 'block';
    btn1.style.display = 'none';
});

btn2.addEventListener('click', () => {
    btn2.style.display = 'none';
    session1.style.display = 'none';
    session2.style.display = 'none';
    btn1.style.display = 'block';
});

show();

submit.addEventListener('click', () => {
    let bookName = document.getElementById('text1').value;
    let authorName = document.getElementById('text2').value;
    let totalBook = document.getElementById('text3').value;

    if((localStorage.getItem('BookName') && localStorage.getItem('AuthorName') && localStorage.getItem('TotalBook')) == null){
        localStorage.setItem('BookName', '[]');
        localStorage.setItem('AuthorName', '[]');
        localStorage.setItem('TotalBook', '[]');
    }

    if((bookName && authorName && totalBook) == ""){
        err.style.display = 'block';
        setTimeout(() => {
            err.style.display = 'none';
        }, 1000);
    }else{
        // taking old_data + new_data and inserting into localstorage
        let old_data1 = JSON.parse(localStorage.getItem('BookName'));
        old_data1.push(bookName);
        localStorage.setItem('BookName', JSON.stringify(old_data1));
        
        let old_data2 = JSON.parse(localStorage.getItem('AuthorName'));
        old_data2.push(authorName);
        localStorage.setItem('AuthorName', JSON.stringify(old_data2));
        
        let old_data3 = JSON.parse(localStorage.getItem('TotalBook'));
        old_data3.push(totalBook);
        localStorage.setItem('TotalBook', JSON.stringify(old_data3));
    
        document.getElementById('text1').value = "";
        document.getElementById('text2').value = "";
        document.getElementById('text3').value = "";

        suc.style.display = 'block';
        setTimeout(() => {
            suc.style.display = 'none';
        }, 1000);

        show();
    }
});

function show() {
    let dataShow = document.getElementById('dataShow');

    let getBook = JSON.parse(localStorage.getItem('BookName'));
    let getAuthor = JSON.parse(localStorage.getItem('AuthorName'));
    let getTotal = JSON.parse(localStorage.getItem('TotalBook'));

    let index = getBook.length;
    

    let htmlData = ``;

    if((getBook) != null){
        for(let i = 0; i<index; i++){
            htmlData += `
            <tr>
                <th>${i+1}</th>
                <th>${getBook[i]}</th>
                <th>${getAuthor[i]}</th>
                <th>${getTotal[i]}</th>
                <th class="btn-group"><button onclick="edt(${i})"><i class="fas fa-edit"></i></button>
                <button onclick="del(${i})"><i class="fas fa-trash-alt"></i></button></th>
            </tr>`;
        };
    }
    dataShow.innerHTML = htmlData;
}

function del(index) {
    let data1 = JSON.parse(localStorage.getItem('BookName'));
    let data2 = JSON.parse(localStorage.getItem('AuthorName'));
    let data3 = JSON.parse(localStorage.getItem('TotalBook'));

    let len = data1.length;

    if((data1) != null){
        for(let i = 0; i<len; i++){
            if(index == i){
                data1.splice(index, 1);
                data2.splice(index, 1);
                data3.splice(index, 1);
                localStorage.setItem('BookName', JSON.stringify(data1));
                localStorage.setItem('AuthorName', JSON.stringify(data2));
                localStorage.setItem('TotalBook', JSON.stringify(data3));
            }
        };
    }

    show();
}

function edt(index) {
    
    // Fetching data from localstorage
    let data1 = JSON.parse(localStorage.getItem('BookName'));
    let data2 = JSON.parse(localStorage.getItem('AuthorName'));
    let data3 = JSON.parse(localStorage.getItem('TotalBook'));
    
    let len = data1.length;
    
    if((data1) != null){
        for(let i = 0; i<len; i++){
            if(index == i){
                // changing button while onclick from save to change
                submit.style.display = 'none';
                change.style.display = 'block';

                // Fetching id of input field
                let txt1 = document.getElementById('text1');
                let txt2 = document.getElementById('text2');
                let txt3 = document.getElementById('text3');

                // displaying text inside input filed while on click
                txt1.value = data1[index];
                txt2.value = data2[index];
                txt3.value = data3[index];

                // change the text inside localstorage and display while onclick

                change.addEventListener('click', () => {

                    let indexOfData1 = data1.indexOf(data1[index]);
                    let indexOfData2 = data2.indexOf(data2[index]);
                    let indexOfData3 = data3.indexOf(data3[index]);
                    
                    
                    
                    if(indexOfData1 != -1){
                        let dt1 = document.getElementById('text1').value;
                        data1.splice(indexOfData1, 1, dt1);
                        localStorage.setItem('BookName', JSON.stringify(data1));
                    }
                    if(indexOfData2 != -1){
                        let dt2 = document.getElementById('text2').value;
                        data2.splice(indexOfData2, 1, dt2);
                        localStorage.setItem('AuthorName', JSON.stringify(data2));
                    }
                    if(indexOfData3 != -1){
                        let dt3 = document.getElementById('text3').value;
                        data3.splice(indexOfData3, 1, dt3);
                        localStorage.setItem('TotalBook', JSON.stringify(data3));
                    }
                    
                    change.style.display = 'none';
                    submit.style.display = 'block';

                    show();
                });
            }
        }
    }
}
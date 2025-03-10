let mood = 'create'; // متغير لتحديد الوضع (إنشاء أو تعديل)
let tmp; // متغير لتخزين الفهرس في حالة التعديل

function gettotal() {
    if (price.value != '') {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = 'green';
    } else {
        total.innerHTML = '';
        total.style.background = 'red';
    }
}

function clearData() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
    submit.value = 'create';
}

let datapro;
if (localStorage.product != null) {
    datapro = JSON.parse(localStorage.product);
} else {
    datapro = [];
}

submit.onclick = function () {
    if (title.value != '' && price.value != '' && category.value != '') {
        let newpro = {
            title: title.value.toLowerCase(),
            price: price.value,
            taxes: taxes.value,
            ads: ads.value,
            discount: discount.value,
            total: total.innerHTML,
            count: count.value,
            category: category.value.toLowerCase(),
        };
        if (mood === 'create') {
            if (newpro.count > 1) {
                for (let i = 0; i < newpro.count; i++) {
                    datapro.push(newpro);
                }
            } else {
                datapro.push(newpro);
            }
        } else {
            datapro[tmp] = newpro;
            mood = 'create';
            submit.innerHTML = 'create';
            count.style.display = 'block';
        }

        localStorage.setItem('product', JSON.stringify(datapro));
        clearData();
        showdata();
    } else {
        alert('العنوان فاضي! من فضلك اكتب عنوان المنتج.');
    }
};

function showdata() {
    gettotal();
    let table = '';
    for (let i = 0; i < datapro.length; i++) {
        table += `
            <tr>
              <td>${i}</td>
              <td>${datapro[i].title}</td>
              <td>${datapro[i].price}</td>
              <td>${datapro[i].taxes}</td>
              <td>${datapro[i].ads}</td>
              <td>${datapro[i].discount}</td>
              <td>${datapro[i].total}</td>
              <td>${datapro[i].category}</td>              
              <td><button onclick="updatedata(${i})" id="update">update</button></td>
              <td onclick="delet(${i})"><button id="delete">delete</button></td>
            </tr>
        `;
    }
    document.getElementById('tbody').innerHTML = table;

    let btndelete = document.getElementById('deleteall');
    if (btndelete) {
        if (datapro.length > 0) {
            btndelete.innerHTML = `<button onclick="deleteall()">delete all (${datapro.length})</button>`;
        } else {
            btndelete.innerHTML = '';
        }
    }
}

function delet(i) {
    datapro.splice(i, 1);
    localStorage.setItem('product', JSON.stringify(datapro));
    showdata();
}

function deleteall() {
    localStorage.clear();
    datapro.splice(0);
    showdata();
}

function updatedata(i) {
    title.value = datapro[i].title;
    price.value = datapro[i].price;
    taxes.value = datapro[i].taxes;
    ads.value = datapro[i].ads;
    discount.value = datapro[i].discount;
    category.value = datapro[i].category;
    gettotal();
    count.style.display = 'none';
    submit.innerHTML = 'update';
    mood = 'update';
    tmp = i;
    scroll({ top: 0, behavior: 'smooth' });
}

let searchmood = 'title';
function getsrarchmood(id) {
    let search = document.getElementById('search');
    if (id == 'searchtitle') {
        searchmood = 'title';
        search.placeholder = 'search title';
    } else {
        searchmood = 'category';
        search.placeholder = 'search category';
    }
    search.focus();
    search.value = '';
}

function searchdata(value) {
    let table = '';
    value = value.toLowerCase();
    for (let i = 0; i < datapro.length; i++) {
        if ((searchmood === 'title' && datapro[i].title.includes(value)) || 
            (searchmood === 'category' && datapro[i].category.includes(value))) {
            table += `
                <tr>
                  <td>${i}</td>
                  <td>${datapro[i].title}</td>
                  <td>${datapro[i].price}</td>
                  <td>${datapro[i].taxes}</td>
                  <td>${datapro[i].ads}</td>
                  <td>${datapro[i].discount}</td>
                  <td>${datapro[i].total}</td>
                  <td>${datapro[i].category}</td>              
                  <td><button onclick="updatedata(${i})" id="update">update</button></td>
                  <td onclick="delet(${i})"><button id="delete">delete</button></td>
                </tr>
            `;
        }
    }
    document.getElementById('tbody').innerHTML = table;
}

showdata();

















































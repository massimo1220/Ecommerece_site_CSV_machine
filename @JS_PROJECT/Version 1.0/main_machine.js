
// open file

let selectedFile;
console.log(window.XLSX);
document.getElementById('input').addEventListener("change", (event) => {
    selectedFile = event.target.files[0];
})

let data = [{
    "name": "jayanth",
    "data": "scd",
    "abc": "sdef"
}]

// for first file (category file)

let output_json = [];


let category_id = 11;         // you can just change it, then it's okay.
let category_id_flag = 11;    // same as category_id. for the first time load.
const pa_category = [];
const name_en_gb = [];

let temp_pa_id = 0;
let start_num = category_id + 1;  ///set as category_id + 1
let temp_string_prod;
let temp_string_manu;
let numbers_of_one_list = 140;   //numbers of one list
let temp_numbers_index = 0;
let pa_id_for_list = 1;

function add_default_cols(index_i) {

    let product = {
        "category_id": "1",
        "parent_id": "0",
        "name(it-it)": "Listino 1",
        "top": "true",
        "columns": 0,
        "sort_order": 0,
        "image_name": "",
        "date_added": "",
        "date_modified": "",
        "description(it-it)": "LISTINO IN PREPARAZIONE",
        "meta_title(it-it)": "same as name(it-it)",
        "meta_description(it-it)": "",
        "meta_keywords(it-it)": "",
        "store_ids": 0,
        "layout": "",
        "status": "true",      //important
    };

    product["category_id"] = index_i;
    product["name(it-it)"] = "Listino " + index_i;
    product["meta_title(it-it)"] = "Listino " + index_i;
    const d = new Date();
    let str_date = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    product["date_added"] = str_date;
    product["date_modified"] = str_date;

    output_json.push(product);
}

function add_product(data1, data2, data3) {

    let product = {
        "category_id": "1",
        "parent_id": "1",
        "name(it-it)": "Apple",
        "top": "true",
        "columns": 0,
        "sort_order": 0,
        "image_name": "",
        "date_added": "",
        "date_modified": "",
        "description(it-it)": "",
        "meta_title(it-it)": "same as name(it-it)",
        "meta_description(it-it)": "",
        "meta_keywords(it-it)": "",
        "store_ids": 0,
        "layout": "",
        "status": "true",
    };
    product["category_id"] = data1;
    product["parent_id"] = data2;
    product["name(it-it)"] = data3;
    product["meta_title(it-it)"] = data3;
    const d = new Date();
    let str_date = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    product["date_added"] = str_date;
    product["date_modified"] = str_date;
    output_json.push(product);
    // output_json = JSON.stringify(output_json)

    //console.log(output_json);
}


// for second file (product_id file)

let temp_cate_id = category_id + 1;
let temp_index_f2 = 1;
let output_json_f2 = [];


function main_machine_f2(cate_id, rowObject) {

    let product = {
        "product_id": "1",
        "name(it-it)": "Apple i mac bla bla",
        "categories": "2 important",
        "sku": "",
        "upc": "",
        "ean": "194252128688",
        "jan": "",
        "isbn": "",
        "mpn": "",
        "location": "",
        "quantity": "10",
        "model": "1001-737",
        "manufacturer": "Apple important",
        "image_name": "",
        "shipping": "yes",
        "price": "",
        "points": 0,
        "date_added": "",
        "date_modified": "",
        "date_available": "",
        "weight": 0.00,
        "weight_unit": "kg",
        "length": 0,
        "width": 0,
        "height": 0,
        "length_unit": "cm",
        "status": "true",
        "tax_class_id": 0,
        "description(it-it)": "",
        "meta_title(it-it)": "",
        "meta_description(it-it)": "",
        "meta_keywords(it-it)": "",
        "stock_status_id": 5,
        "store_ids": 0,
        "layout": "",
        "related_ids": "",
        "tags(it-it)": "",
        "sort_order": 1,
        "subtract": "true",
        "minimum": 1,
    };
    product["product_id"] = temp_index_f2;
    product["name(it-it)"] = rowObject.article_name;
    product["meta_title(it-it)"] = rowObject.article_name;
    product["categories"] = cate_id;
    product["ean"] = rowObject.EAN;
    product["quantity"] = rowObject.quantity;
    product["model"] = rowObject.article_number;
    product["manufacturer"] = rowObject.manufacturer;
    product["price"] = rowObject.price;
    const d = new Date();
    let str_date = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    product["date_added"] = str_date;
    product["date_modified"] = str_date;
    product["date_available"] = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
    product["description(it-it)"] = rowObject.description;

    output_json_f2.push(product);

    temp_index_f2++;
}


function main_machine(rowObject) {
    if (category_id == category_id_flag) {   //first add
        pa_category[category_id] = pa_id_for_list;
        name_en_gb[category_id] = rowObject.product_group;
        temp_string_prod = rowObject.product_group;         //temp
        //console.log("category_id     pa_category     name_en_gb");
        //console.log(category_id + "\t\t\t\t\t" + pa_category[category_id] + "\t\t\t\t\t" + name_en_gb[category_id]);
        add_product(category_id, pa_category[category_id], name_en_gb[category_id]);
        category_id++;
        temp_numbers_index++;

        pa_category[category_id] = category_id - 1;
        name_en_gb[category_id] = rowObject.manufacturer;
        temp_string_manu = rowObject.manufacturer;          //temp
        //console.log(category_id + "\t\t\t\t\t" + pa_category[category_id] + "\t\t\t\t\t" + name_en_gb[category_id]);
        add_product(category_id, pa_category[category_id], name_en_gb[category_id]);

        main_machine_f2(temp_cate_id, rowObject);
        category_id++;
        temp_numbers_index++;
    }
    else {
        if (rowObject.product_group == temp_string_prod) {
            if (rowObject.manufacturer != temp_string_manu) {
                let flag = 0;
                for (let i = start_num; i < category_id; i++) {
                    if (rowObject.manufacturer == name_en_gb[i]) {
                        flag = 1;
                        //console.log("                               (" + rowObject.manufacturer + ")---repeat!!!");
                        temp_cate_id = i;
                        break;
                    }
                }
                if (flag == 0) {
                    pa_category[category_id] = temp_pa_id;              //parent_id set as temp_pa_id
                    name_en_gb[category_id] = rowObject.manufacturer;
                    temp_string_manu = rowObject.manufacturer;
                    //console.log(category_id + "\t\t\t\t\t" + pa_category[category_id] + "\t\t\t\t\t" + name_en_gb[category_id]);
                    add_product(category_id, pa_category[category_id], name_en_gb[category_id]);

                    temp_cate_id = category_id;
                    main_machine_f2(temp_cate_id, rowObject);
                    category_id++;
                    temp_numbers_index++;
                }
                else {
                    // flag == 1 
                    main_machine_f2(temp_cate_id, rowObject);
                }
            }
            else {
                //console.log("                     (" + rowObject.manufacturer + ")pass!!!");
                main_machine_f2(temp_cate_id, rowObject);
            }
        }
        else {
            pa_category[category_id] = pa_id_for_list;
            name_en_gb[category_id] = rowObject.product_group;
            start_num = category_id + 1;
            temp_pa_id = category_id;
            temp_string_prod = rowObject.product_group;
            //console.log(category_id + "\t\t\t\t\t" + pa_category[category_id] + "\t\t\t\t\t" + name_en_gb[category_id]);
            add_product(category_id, pa_category[category_id], name_en_gb[category_id]);
            category_id++;
            temp_numbers_index++;

            pa_category[category_id] = temp_pa_id;
            name_en_gb[category_id] = rowObject.manufacturer;
            temp_string_manu = rowObject.manufacturer;          //temp
            //console.log(category_id + "\t\t\t\t\t" + pa_category[category_id] + "\t\t\t\t\t" + name_en_gb[category_id]);
            add_product(category_id, pa_category[category_id], name_en_gb[category_id]);

            temp_cate_id = category_id;
            main_machine_f2(temp_cate_id, rowObject);
            category_id++;
            temp_numbers_index++;
        }
    }
    if (temp_numbers_index >= numbers_of_one_list) {
        temp_numbers_index = 0;
        pa_id_for_list++;
    }
}


document.getElementById('button').addEventListener("click", () => {

    document.getElementById("button").style = "display: none;";
    document.getElementById("button_loading").style = "display: block;";
    document.getElementById("wait_div").innerHTML = "Please wait. it will take several minutes.(Attendere prego. ci vorranno diversi minuti.)";

    XLSX.utils.json_to_sheet(data, 'out.xlsx');
    if (selectedFile) {
        let fileReader = new FileReader();
        fileReader.readAsBinaryString(selectedFile);
        fileReader.onload = (event) => {
            let data = event.target.result;
            let workbook = XLSX.read(data, { type: "binary" });
            console.log(workbook);
            workbook.SheetNames.forEach(sheet => {
                let rowObject = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheet]);
                console.log(rowObject);

                //////IMPORTANT
                for (let i = 1; i < category_id; i++) {
                    add_default_cols(i);
                }
                rowObject && rowObject.map((rowObject, index) => (
                    main_machine(rowObject)
                ));
                console.log(output_json);
                console.log(output_json_f2);

                //document.getElementById("jsondata").innerHTML = JSON.stringify(output_json, undefined, 4);
                //document.getElementById("jsondata_f2").innerHTML = JSON.stringify(output_json_f2, undefined, 4);

                try {
                    var myFile = "Modello CSV Categorie Con Marche.xlsx";
                    var myWorkSheet = XLSX.utils.json_to_sheet(output_json);
                    var myWorkBook = XLSX.utils.book_new();
                    XLSX.utils.book_append_sheet(myWorkBook, myWorkSheet, "Categories");
                    XLSX.writeFile(myWorkBook, myFile);
                } catch (err) {
                    console.log("Error:", err);
                }

                try {
                    var myFile = "Modello CSV Prodotti.xlsx";
                    var myWorkSheet = XLSX.utils.json_to_sheet(output_json_f2);
                    var myWorkBook = XLSX.utils.book_new();
                    XLSX.utils.book_append_sheet(myWorkBook, myWorkSheet, "Products");
                    XLSX.writeFile(myWorkBook, myFile);
                } catch (err) {
                    console.log("Error:", err);
                }

                document.getElementById("button_loading").style = "display: none;";
                document.getElementById("button_done").style = "display: block;";
            });
        }
    }
});
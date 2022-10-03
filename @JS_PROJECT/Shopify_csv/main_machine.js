
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

function add_product(data1, data2, data3) {

    let product = {
        "Handle": "1",
        "Title": "1",
        "Body (HTML)": "Apple",
        "Vendor": "true",
        "Standardized Product Type": 0,
        "Custom Product Type": 0,
        "Tags": "",
        "Published": "",
        "Option1 Name": "",
        "Option1 Value": "",
        "Option2 Name": "same as name(it-it)",
        "Option2 Value": "",
        "Option3 Name": "1",
        "Option3 Value": "1",
        "Variant SKU": "1",
        "Variant Grams": "1",
        "Variant Inventory Tracker": "1",
        "Variant Inventory Qty": "1",
        "Variant Inventory Policy": "1",
        "Variant Fulfillment Service": "1",
        "Variant Price": "1",
        "Variant Compare At Price": "1",
        "Variant Requires Shipping": "1",
        "Variant Taxable": "1",
        "Variant Barcode": "1",
        "Image Src": "1",
        "Image Position": "1",
        "Image Alt Text": "1",
        "Gift Card": "1",
        "SEO Title": "1",
        "SEO Description": "1",
        "Google Shopping / Google Product Category": "1",
        "Google Shopping / Gender": "1",
        "Google Shopping / Age Group": "1",
        "Google Shopping / MPN": "1",
        "Google Shopping / AdWords Grouping": "1",
        "Google Shopping / AdWords Labels": "1",
        "Google Shopping / Condition": "1",
        "Google Shopping / Custom Product": "1",
        "Google Shopping / Custom Label 0": "1",
        "Google Shopping / Custom Label 1": "1",
        "Google Shopping / Custom Label 2": "1",
        "Google Shopping / Custom Label 3": "1",
        "Google Shopping / Custom Label 4": "1",
        "Variant Image": "1",
        "Variant Weight Unit": "1",
        "Variant Tax Code": "1",
        "Cost per item": "1",
        "Price / International": "1",
        "Compare At Price / International": "1",
        "Status": "1",
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


function main_machine(rowObject) {
    if (category_id == category_id_flag) {   //first add
        pa_category[category_id] = pa_id_for_list;
        name_en_gb[category_id] = rowObject["Produktgruppe"];
        temp_string_prod = rowObject["Produktgruppe"];         //temp
        //console.log("category_id     pa_category     name_en_gb");
        //console.log(category_id + "\t\t\t\t\t" + pa_category[category_id] + "\t\t\t\t\t" + name_en_gb[category_id]);
        add_product(category_id, pa_category[category_id], name_en_gb[category_id]);
        
        category_id++;
    }
    else {
        if(rowObject["Produktgruppe"] != temp_string_prod) {
            pa_category[category_id] = pa_id_for_list;
            name_en_gb[category_id] = rowObject["Produktgruppe"];
            temp_pa_id = category_id;
            temp_string_prod = rowObject["Produktgruppe"];
            //console.log(category_id + "\t\t\t\t\t" + pa_category[category_id] + "\t\t\t\t\t" + name_en_gb[category_id]);
            add_product(category_id, pa_category[category_id], name_en_gb[category_id]);
            category_id++;
        }
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


                //document.getElementById("jsondata").innerHTML = JSON.stringify(output_json, undefined, 4);
                //document.getElementById("jsondata_f2").innerHTML = JSON.stringify(output_json_f2, undefined, 4);

                try {
                    var myFile = "Shopify_data.xlsx";
                    var myWorkSheet = XLSX.utils.json_to_sheet(output_json);
                    var myWorkBook = XLSX.utils.book_new();
                    XLSX.utils.book_append_sheet(myWorkBook, myWorkSheet, "Shopify");
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
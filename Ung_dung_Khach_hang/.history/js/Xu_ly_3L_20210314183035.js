//************** Xử lý Lưu trữ ***********
//************** Khai báo đường dẫn Dịch vụ  ***********
var Dia_chi_Dich_vu = "http://localhost:1000"
    // var Dia_chi_Media = "http://localhost:1001"

// var Dia_chi_Dich_vu = "https://tam-data.herokuapp.com/"
var Dia_chi_Media = "https://tam-media.herokuapp.com/"

//************** Các Hàm Xử lý Đọc Xuất   ***********
function Doc_Danh_sach_Dien_thoai() {
    var Du_lieu = {}
    var Xu_ly_HTTP = new XMLHttpRequest()
    var Tham_so = `Ma_so_Xu_ly=DOC_DANH_SACH_DIEN_THOAI`
    var Dia_chi_Xu_ly = `${Dia_chi_Dich_vu}?${Tham_so}`
    Xu_ly_HTTP.open("POST", Dia_chi_Xu_ly, false)
    Xu_ly_HTTP.send("")
    var Chuoi_JSON = Xu_ly_HTTP.responseText
    if (Chuoi_JSON != "")
        Du_lieu = JSON.parse(Chuoi_JSON)
    return Du_lieu
}

function Doc_Thong_tin_Cua_hang() {
    var Du_lieu = {}
    var Xu_ly_HTTP = new XMLHttpRequest()
    var Tham_so = `Ma_so_Xu_ly=DOC_CUA_HANG`
    var Dia_chi_Xu_ly = `${Dia_chi_Dich_vu}?${Tham_so}`
    Xu_ly_HTTP.open("POST", Dia_chi_Xu_ly, false)
    Xu_ly_HTTP.send("")
    var Chuoi_JSON = Xu_ly_HTTP.responseText
    if (Chuoi_JSON != "")
        Du_lieu = JSON.parse(Chuoi_JSON)
    return Du_lieu
}

function Xuat_Thong_tin_Cua_hang(cuaHang) {
    let html = `
    <div class="col-12 col-md-2 ">
                <img src="${Dia_chi_Media}/logo.png">
            </div>
            <div class="col-12 col-md-10 bg-dark ">
                <blockquote class="blockquote">
                    <h1 class="display-4 text-danger text-center">${cuaHang[0].Ten}</h1>
                    <footer class="blockquote-footer text-center">
                        <cite title="Source Title">${cuaHang[0].Mo_cua}</cite>
                    </footer>
                    <footer class="blockquote-footer text-center">
                        <cite title="Source Title">
                <i class="fa fa-envelope-o" aria-hidden="true"></i> ${cuaHang[0].Email} - <i class="fa fa-phone" aria-hidden="true"></i>:
                <a href="Sđt:0385-039-140">${cuaHang[0].Dien_thoai}</a>
                </blockquote>
                
            </div>
            
            
    `
    console.log(cuaHang)
    Th_header.innerHTML = html;
}


function Xuat_Danh_sach_San_pham(dsDienThoai) {
    let html = ``
    dsDienThoai.forEach(dienThoai => {
        html += `
            
        <div class="col-6 col-md-4 col-xl-4 mb-1 mt-2">
        <div class="card pl-1 pr-1 shadow-sm p-1 mb-5 rounded">
          <img class="card-img-top" src="${Dia_chi_Media}/${dienThoai.Ma_so}.png" alt="">
          <div class="card-body">
            <p class="card-title text-danger"> ${dienThoai.Ten}</p>
            <p class="card-text text-info"> ${Tao_Chuoi_The_hien_So_nguyen_duong(dienThoai.Don_gia_Ban)}<sup>đ</sup></p>
          </div>
          <div class="card-footer text-success">
            <button type="button" class="btn btn-success btn-ml" onclick="themGiohang('${dienThoai.Ma_so}')">
                <i class="fa fa-shopping-cart m-1" aria-hidden="true" "></i>Mua hàng
            </button> 
            <button type="button" class="btn btn-info btn-xl ml-2" onclick="chiTietSanPham('${dienThoai.Ma_so}')">
            <i class="fa fa-shopping-cart m-1" aria-hidden="true"></i>Chi tiết 
            </button>           
          </div>
        </div>
        </div>
        `

    });
    Th_Danh_sach_Dien_thoai.innerHTML = html;
}

function themGiohang(id) {
    // // Lưu Session 
    var ds = []
    if (sessionStorage.getItem("Danh_sach_Chon") != undefined) {
        ds = JSON.parse(sessionStorage.getItem("Danh_sach_Chon"))
    }

    var vt = ds.findIndex(x => x.Ma_so == id)

    if (vt == -1) {
        let tmp = dienThoai.find(x => x.Ma_so == id);
        let dThoai = {
            "Ma_so": id,
            "Ten": tmp.Ten,
            "So_luong": 1,
            "Don_gia_Ban": Number(tmp.Don_gia_Ban)
        }
        ds.push(dThoai) // Thêm
    }

    if (ds.length > 0) {
        sessionStorage.setItem("Danh_sach_Chon", JSON.stringify(ds))
    } else {
        sessionStorage.removeItem("Danh_sach_Chon")
    }
    // Th_Gio_hang.innerHTML = `<u>${ds.length}</u>`
}


function chiTietSanPham(maSo) {
    let dienthoai = dienThoai.find(x => x.Ma_so == maSo);
    modalTitle.innerHTML = dienthoai.Ten
    let html = `
        <img src="${Dia_chi_Media}/${dienthoai.Ma_so}.png" class="img-fluid">
        <p class="text-danger">Đơn giá Bán: ${Tao_Chuoi_The_hien_So_nguyen_duong(dienthoai.Don_gia_Ban)}<sup>đ</sup></p>
    `
    modalBody.innerHTML = html;
    showModal.click()
}

function SearchSanPham(Th_gtTim) {
    let dsdienThoai = dienThoai.filter(x => x.Ten.toLowerCase().includes(Th_gtTim.value.toLowerCase()));
    Xuat_Danh_sach_San_pham(dsdienThoai)

}
Th_Tim.onclick = () => {
    SearchSanPham(Th_gtTim)
}


function LocSanPham() {
    let loc = dienThoai.find(x => x.Nhom_Dien_Thoai.Ma_so == "ANDROID")
}

function Khach_hang_Lien_he(noi_dung) {
    return new Promise((Ket_qua, Loi) => {
        var Gui = {
            body: noi_dung
        }
        var Kq = {}
        var Xu_ly_HTTP = new XMLHttpRequest()
        Xu_ly_HTTP.onload = () => {
            var Chuoi_JSON = Xu_ly_HTTP.responseText
            Kq = JSON.parse(Chuoi_JSON)
            Ket_qua(Kq)
        }
        var Tham_so = `Ma_so_Xu_ly=LIEN_HE`
        var Dia_chi_Xu_ly = `${Dia_chi_Dich_vu}?${Tham_so}`
        Xu_ly_HTTP.open("POST", Dia_chi_Xu_ly)
        Xu_ly_HTTP.send(JSON.stringify(Gui))
    })
}

function Khach_hang_Nhan_tin(noi_dung) {
    return new Promise((Ket_qua, Loi) => {


        var Xu_ly_HTTP = new XMLHttpRequest()
        Xu_ly_HTTP.onload = () => {
            var Chuoi = Xu_ly_HTTP.responseText
            if (Chuoi == "OK") {
                Ket_qua(Chuoi)
            } else {
                Loi(Chuoi)
            }


        }
        var Tham_so = `Ma_so_Xu_ly=SMS`
        var Dia_chi_Xu_ly = `${Dia_chi_Dich_vu}?${Tham_so}`
        Xu_ly_HTTP.open("POST", Dia_chi_Xu_ly)
        Xu_ly_HTTP.send(JSON.stringify(noi_dung))
    })
}


// ***************************** Xuất ***********************






//************** Các Hàm Xử lý Số, Ngày    ***********

//==============================================================================
// Xử lý biến Số nguyên
function Nhap_So_nguyen_duong(Th_So_nguyen) {
    var Kq = {}
    Kq.So_nguyen = parseInt(Th_So_nguyen.value.trim())
    Kq.Hop_le = !isNaN(Kq.So_nguyen) && Kq.So_nguyen > 0
    return Kq
}

function Tao_Chuoi_The_hien_So_nguyen_duong(So_nguyen) {
    var Chuoi_The_hien = ""
    var Chuoi_So_nguyen = So_nguyen.toString()
    var So_Ky_so = Chuoi_So_nguyen.length
    if (So_Ky_so % 3 == 0) {
        for (var Chi_so = 0; Chi_so < Chuoi_So_nguyen.length; Chi_so++) {
            Chuoi_The_hien += Chuoi_So_nguyen[Chi_so]
            if (Chi_so % 3 == 2 && Chi_so < Chuoi_So_nguyen.length - 1)
                Chuoi_The_hien += "."
        }
    } else if (So_Ky_so % 3 == 1) {
        Chuoi_The_hien = Chuoi_So_nguyen[0]
        if (So_Ky_so > 1)
            Chuoi_The_hien += "."
        Chuoi_So_nguyen = Chuoi_So_nguyen.slice(1)
        for (var Chi_so = 0; Chi_so < Chuoi_So_nguyen.length; Chi_so++) {
            Chuoi_The_hien += Chuoi_So_nguyen[Chi_so]
            if (Chi_so % 3 == 2 && Chi_so < Chuoi_So_nguyen.length - 1)
                Chuoi_The_hien += "."

        }
    } else if (So_Ky_so % 3 == 2) {
        Chuoi_The_hien = Chuoi_So_nguyen[0] + Chuoi_So_nguyen[1]
        if (So_Ky_so > 2)
            Chuoi_The_hien += "."
        Chuoi_So_nguyen = Chuoi_So_nguyen.slice(2)
        for (var Chi_so = 0; Chi_so < Chuoi_So_nguyen.length; Chi_so++) {
            Chuoi_The_hien += Chuoi_So_nguyen[Chi_so]
            if (Chi_so % 3 == 2 && Chi_so < Chuoi_So_nguyen.length - 1)
                Chuoi_The_hien += "."
        }
    }
    return Chuoi_The_hien
}
// Xử lý Biến Số thực
function Nhap_So_thuc_duong(Th_So_thuc) {
    var Kq = {}
    Kq.So_thuc = parseInt(Th_So_thuc.value.trim())
    Kq.Hop_le = !isNaN(Kq.So_thuc) && Kq.So_thuc > 0
    return Kq
}

function Tao_Chuoi_The_hien_So_thuc_duong(So_thuc, So_so_le) {
    So_thuc = parseFloat(So_thuc)
    var Chuoi_The_hien = ""
    if (!So_so_le)
        So_so_le = 2
    var Thanh_phan_con = So_thuc
        .toFixed(So_so_le)
        .split(".")
    Chuoi_The_hien = Tao_Chuoi_The_hien_So_nguyen_duong(Thanh_phan_con[0])
    if (Thanh_phan_con.length == 2 && parseInt(Thanh_phan_con[1]) != 0 && So_so_le > 0)
        Chuoi_The_hien += "," + Tao_Chuoi_The_hien_So_nguyen_duong(Thanh_phan_con[1])
    return Chuoi_The_hien
}

function Tao_Chuoi_The_hien_Tien(So_tien, n) {
    if (!n)
        n = 0

    var Chuoi_The_hien = Tao_Chuoi_The_hien_So_thuc_duong(So_tien, n)

    return Chuoi_The_hien
}

// Xử lý với Biến Ngày
function La_Ngay_Hien_hanh(Ngay) {
    var Ngay_Hien_hanh = new Date()
    Ngay = new Date(Ngay)
    var Kq = Ngay_Hien_hanh.getDate() == Ngay.getDate() &&
        Ngay_Hien_hanh.getMonth() == Ngay.getMonth() &&
        Ngay_Hien_hanh.getFullYear() == Ngay.getFullYear()

    return Kq
}

function Tao_Chuoi_The_hien_Ngay(Ngay) {
    var Chuoi_The_hien = ""
    if (!Ngay)
        Ngay = new Date()
    Chuoi_The_hien = Ngay.getDate() + "/" + (Ngay.getMonth() + 1) + "/" + Ngay.getFullYear()
    return Chuoi_The_hien
}

function Tao_Chuoi_The_hien_Gio(Ngay) {
    var Chuoi_The_hien = ""
    if (!Ngay)
        Ngay = new Date()
    Chuoi_The_hien = Ngay.getHours() + ":" + Ngay.getMinutes() + ":" + Ngay.getMinutes()
    return Chuoi_The_hien
}

function Tao_Chuoi_The_hien_Ngay_Gio(Ngay) {
    var Chuoi_The_hien = Tao_Chuoi_The_hien_Ngay(Ngay) + " " + Tao_Chuoi_The_hien_Gio(Ngay)
    return Chuoi_The_hien
}

function Kiem_tra_Ngay(Chuoi_ngay) {
    var Thanh_phan_con = Chuoi_ngay.split("/")
    var Hop_le = Thanh_phan_con.length == 3 && !isNaN(Thanh_phan_con[0]) && !isNaN(Thanh_phan_con[1]) && !isNaN(Thanh_phan_con[2])
    if (Hop_le) {
        var Ng = parseInt(Thanh_phan_con[0])
        var Th = parseInt(Thanh_phan_con[1])
        var Nm = parseInt(Thanh_phan_con[2])
        var So_ngay_cua_Th = new Date(Nm, Th, 0).getDate()
            // var So_ngay_cua_Th = new Date(Nm, Th+1 , 0).getDate()
        Hop_le = Ng >= 1 && Ng <= So_ngay_cua_Th && Th >= 1 && Th <= 12 && Nm > 0
    }
    return Hop_le
}

function Nhap_Ngay(Th_Ngay) {
    var Kq = {}
    var Chuoi_Ngay = Th_Ngay
        .value
        .trim()
    Kq.Hop_le = Kiem_tra_Ngay(Chuoi_Ngay)
    if (Kq.Hop_le) {
        var Thanh_phan_con = Chuoi_ngay.split("/")
        Kq.Ngay = new Date(Thanh_phan_con[1] + "-" + Thanh_phan_con[0] + "-" + Thanh_phan_con[2])
    }

    return Kq
}
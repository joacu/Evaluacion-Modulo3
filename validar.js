
function ingreso(){
   
            var req=new XMLHttpRequest();
            req.open("GET","ingreso.html",true);
            req.onreadystatechange=function(aEvt){
                if (req.readyState==4){
                    if (req.status==200){
                        document.getElementById('pagina').innerHTML=req.responseText;
                    }else{
                        document.getElementById('pagina').innerHTML="ERROR AL CARGAR PAGINA";
                    }
                }
            };
            req.send(null);
            document.getElementById('comentarios').innerHTML="";
            document.getElementById('tabla').innerHTML="";
  
}

function tabla(){
    
    var req=new XMLHttpRequest();
    req.open("GET","cambiar.html",true);
    req.onreadystatechange=function(aEvt){
        if (req.readyState==4){
            if (req.status==200){
                document.getElementById('pagina').innerHTML=req.responseText;
               mostrar();
            }else{
                document.getElementById('pagina').innerHTML="ERROR AL CARGAR PAGINA";
            }
        }
    };
    req.send(null);
}

function compra(){
   
            var req=new XMLHttpRequest();
            req.open("GET","compra.html",true);
            req.onreadystatechange=function(aEvt){
                if (req.readyState==4){
                    if (req.status==200){
                        document.getElementById('pagina').innerHTML=req.responseText;
                    }else{
                        document.getElementById('pagina').innerHTML="ERROR AL CARGAR PAGINA";
                    }
                }
            };
            req.send(null);
            document.getElementById('comentarios').innerHTML="";
            document.getElementById('tabla').innerHTML="";

}

//******** funciones *****//

var lista=[];

function guardar(){
    let nombre= document.getElementById("nombre").value;
    let valor= document.getElementById("valor").value
    let cantidad= document.getElementById("cantidad").value
    let obj=new Productos(nombre,valor, cantidad);
        try{
        if(nombre=="" || valor=="" || cantidad==""){
         throw ("UPS!!! DEBE LLENAR TODOS LOS CAMPOS SOLICITADOS"); 
        }
        lista.push(obj);
        clear();
        } catch (err){
                  alert("error:   " + err);
        }
        alert("Producto agregado satisfactoriamente");
}

class Productos{
    constructor(nombre, valor, cantidad){
        this.nombre=nombre;
        this.valor=valor;
        this.cantidad=cantidad;
    }
}

function mostrar(){
 var fragmento = "";
        fragmento="<h4 class='text-left text-dark'>Productos</h4>";
        fragmento += "<table style='border-radius: 17px; border: 1px solid!important;' class='table table-hover text-center'>";
        fragmento += "<tr class='table-warning h6'>";
        fragmento += "<td>Producto</td>";
        fragmento += "<td>Precio Unitario</td>";
        fragmento += "<td>Cantidad</td>";
        fragmento += "</tr>";
        for (var i = 0; i < lista.length; i++) {
            fragmento += "<tr>";
            fragmento += "<td>" + lista[i].nombre + "</td>";
                fragmento += "<td>" + lista[i].valor + "</td>";
                fragmento += "<td>" + lista[i].cantidad+ "</td>";
                fragmento += "</tr>";
            }
            fragmento += "</table>";
            document.getElementById('tabla').innerHTML = fragmento;
            document.getElementById('comentarios').innerHTML="";
}

function clear() {
    document.getElementById("nombre").value="";
    document.getElementById("valor").value="";
    document.getElementById("cantidad").value="";
    document.getElementById("nombre").focus();
}

function descontar() {
    var res1="";
    let res2="";
    let res3="";
    let res4="";
    let iva="";
    let total1="";
    let total2="";
    var prod = document.getElementById('product').value;
    var cant = parseInt(document.getElementById('cantiproduct').value);
    var desc = parseInt(document.getElementById('descuento').value);
        try {
            if (prod == ""  || cant == 0 || cant == "" ) 
                throw("Todos los campos son requeridos");
            for (var i = 0; i < lista.length; i++) {
                if (prod == lista[i].nombre && lista[i].cantidad >= cant) {
                        res1 = parseInt(lista[i].cantidad) - parseInt(cant); 
                        res2=cant*lista[i].valor; 
                        iva=res2*0.19;
                        res4=res2+iva;
                        total1=(res2+iva);
                        res3=parseInt(total1*(desc/100));
                        total2=total1-res3;
                        lista[i].cantidad = parseInt(res1);
                        document.getElementById('cantiproduct').value="";
                        document.getElementById('product').value="";
                        document.getElementById('product').focus();
                                
                        mostrar();
                        }
                        document.getElementById("comentarios").innerHTML = "<p class='container p-4' style='text-align:left;'>Detalle de su compra <br><br> Producto adquirido: "+prod + "<br><br>Valor sin IVA $"+res2+ "<br>IVA de esta compra $ "+iva+"<br><br>VALOR TOTAL$ "+res4+"<br><br>Descuento Aplicado: "+desc+"%"+"<br> Con esta compra usted ahorró $ "+res3+"<br><br>TOTAL A PAGAR $ "+total2+"<br><br>Gracias por su preferencia...</p>";
            }                  
            }catch (err){
                    alert("error:   " + err);                             
             }finally{
                    document.getElementById('cantiproduct').value="";
                    document.getElementById('product').value="";
                    document.getElementById('product').focus(); 
                }
            }



function verificar() {
    var proM =  document.getElementById('nombreMod').value;
    try {
        console.log(proM);
        if (proM == "")
        throw("ATENCIÓN!!! Debe Ingresar el producto que desea modificar");

        for (var i = 0; i < lista.length; i++) {
            if (proM == lista[i].nombre) {
                alert("PRODUCTO SI EXISTE");
            
                document.getElementById('cantidadMod').style='visible';
                document.getElementById('la1').style='visible';
                document.getElementById('la2').style='visible';
                document.getElementById('ValorMod').style='visible';
                document.getElementById('boton1').style.display='none';
                document.getElementById('boton2').style='visible'
                
            }
        }
        }catch (err){
            alert(" " + err);          
        }
    } 

function cambiar() {
 var cambiarcant = parseInt(document.getElementById('cantidadMod').value);
 var cambiarprecio = parseInt(document.getElementById('ValorMod').value);
       for (var i = 0; i < lista.length; i++) {
        if(cambiarcant ==0){
           lista[i].cantidad =lista[i].cantidad;
        }
        if(cambiarcant !=0){
            lista[i].cantidad = parseInt(cambiarcant); 
            alert("se modificará la cantidad")
        }
        if(cambiarprecio ==0){
           lista[i].valor= lista[i].valor;
        }
         if(cambiarprecio !=0){
            lista[i].valor =  parseInt(cambiarprecio);
            alert("se modificará el precio")
        }
        document.getElementById('cantidadMod').style.display="none";
        document.getElementById('la1').style.display="none";
        document.getElementById('la2').style.display="none";
        document.getElementById('ValorMod').style.display="none";
        document.getElementById('boton1').style.display='block';
        document.getElementById('boton2').style.display="none";
        document.getElementById('nombreMod').value="";
        document.getElementById('nombreMod').focus();   
        mostrar();                  
        }
    }

function eliminar() {
    var elimprod=document.getElementById('elim').value;
        for (var i = 0; i < lista.length; i++) {
            if (elimprod == lista[i].nombre) {
             
            lista.splice(lista.indexOf(lista[i]),1);
            alert("ELIMINADO SATISFACTORIAMENTE DE LA LISTA");
            document.getElementById('elim').value=""; 
            document.getElementById('elim').focus(); 
            }else {
            
            document.getElementById('elim').value=""; 
            document.getElementById('elim').focus(); 
            
        }
    }
 mostrar();  
    }

(function(){

delete_button('Call Details', 1);
delete_button('Call Details', 1);
createNewSaveButton('Call Details',1,'Save','saveAllDetails()','_top',40);
createNewSaveButton('Call Details',2,'Save & New Call','saveAndNewAllDetails()','_top',40);
addSamplesDropSec();
addProdDeailedSec();


function delete_button(section_name, position) {
    var i;
    var ih;
    var tabs = document.getElementsByTagName("table");
    for (i = 0; i < tabs.length; i++) {
        var td = tabs[i].getElementsByTagName("td");
        try {
            // This can generate an exception we ignore, if so it means
            // it's not the ones we're looking for
            ih = td[0].innerHTML;
            if (ih.indexOf(section_name) == 0) {
                var tr = tabs[i].getElementsByTagName("tr");
                tr[0].deleteCell(position);
                return true;
            }
        } catch (ex) {
            // you really don't want to enable this unless at wits end
            // alert("Exception! " + ex.toString());
        }
    }
    return false;
}

function createNewSaveButton(section_name, position, button_text, url, target_window, features){
	var i;
	var ih0;
	var ih1;
	var tabs = document.getElementsByTagName("table");
	for (i = 0; i < tabs.length; i++) 
	{
	  var td = tabs[i].getElementsByTagName("td");
		try 
		  {
			ih0 = td[0].innerHTML;
			ih1 = td[1].innerHTML;
			if (ih0.indexOf(section_name) == 0 || ih1.indexOf(section_name) == 0) 
				{
				var tr = tabs[i].getElementsByTagName("tr");
				var newtd = tr[0].insertCell(position);

				newtd.innerHTML = "<div class='buttonTD' " +
				"id='testSave' " +
				"onmouseover='toggleNavButton(this);' " +
				"onmouseout='toggleNavButton(this);' " +
				"onkeypress='onButtonPress(this);' " +
				"onclick='"+url+";' \>" +
				button_text + "</div>";
				return true;
			}
		} 
		catch (ex) {}
	}
	return false;
}

function addSamplesDropSec(){
	
	var newTable = "<tr><td colspan='5'>";
	newTable += "<table class='ctb' cellspacing='0' cellpadding='0' id='sampleDrop'>";
	newTable += "<tr><td>Samples Dropped</td>";
	newTable += "<td style='align:left'><div class='buttonChildTitleBarTD' id='sampleDropdiv' onclick='addNewRowSampleDrop();'>New</div></td>";
	newTable += "<td width='100%'></td></tr>";
	newTable += "<tr><td colspan='3'></td></tr></table></td></tr>";
	jQuery("[id='ContactCallInsert.VONDMED Next Call']").parent().parent().parent().append(newTable);
}

function addProdDeailedSec(){
	var newTable = "<tr><td colspan='5'>";
	newTable += "<table class='ctb' cellspacing='0' cellpadding='0' id='prodDetail'>";
	newTable += "<tr><td>Products Detailed</td>";
	newTable += "<td style='align:left'><div class='buttonChildTitleBarTD' id='testdiv' onclick='addNewRowProdDet();'>New</div></td>";
	newTable += "<td width='100%'></td></tr>";
	newTable += "<tr><td colspan='3'></td></tr></table></td></tr>";
	jQuery("[id='ContactCallInsert.VONDMED Next Call']").parent().parent().parent().append(newTable);
}

})();

var proditems = [];
var indicationitems = [];
var issuesitems = [];

var prodCount = 0;
var indicationCount = 0;
var issuesCount = 0;

function addNewRowSampleDrop()
{
	var row = "<tr width='100%'><td colspan='3'>";
	row += "<table>";
	row += "<tr>";
	row += "<td>Product Category </td>";
	row += "<td><input name='CallSampDropNew.Primary Product Line Name' id='CallSampDropNew.Primary Product Line Name' maxlength='100' class='inputReadOnly' tabindex='-1' readonly='readonly' type='text' value='' size='20' /></td>";
	row += "<td><p style='color:red'>Product* </p></td>";
	row += "<td><select STYLE='width: 130px' id='prodNameSamDrop'><option value='none'></option><option value='Arcoxia 120mg'>Arcoxia 120mg</option><option value='Arcoxia 60mg'>Arcoxia 60mg</option><option value='Arcoxia 90mg'>Arcoxia 90mg</option><option value='Crocin'>Crocin</option><option value='Singulair 10x100mg'>Singulair 10x100mg</option><option value='Singulair 20x40mg'>Singulair 20x40mg</option></select></td>";
	row += "<td>Lot # </td>";
	row += "<td><input name='CallSampDropNew.LOT Name' size='5' maxlength='20' type='text' value='' class='inputControl' id='CallSampDropNew.LOT Name' /></td></td>";
	row += "<td><p style='color:red'>Quantity* </p></td>";
	row += "<td><input name='CallSampDropNew.Quantity' size='20' type='text' value='' class='inputControl' id='CallSampDropNew.Quantity' /></td>";
	row += "<td><input type='button' name='delete' value='delete' onclick='jQuery(this).parent().parent().parent().parent().parent().remove()'></input></td>";
	row += "</tr></table></td></tr>";	

	jQuery("#sampleDrop").append(row);
}

function addNewRowProdDet(){
	var row = "<tr width='100%'><td colspan='3'>";
	row += "<table>";
	row += "<tr>";
	row += "<td><p style='color:red'>Product* </p></td>";
	row += "<td><select STYLE='width: 130px' id='prodNamePrDet'></select></td>";
	row += "<td>Priority: </td>";
	row += "<td><input name=CallProdDetailNew.Priority size='5' tabindex='4' type='text' value='' class=inputControl id='CallProdDetailNew.Priority' /></td>";
	row += "<td><p style='color:red'>Indication*:</p></td>";
	row += "<td><select name='CallProdDetailNew.Indication' tabindex='5' onchange=onDropDownChange (this); class=inputControl id='CallProdDetailNew.Indication'></select></td>";
	row += "<td>Issues:</td>";
	row += "<td><select name='CallProdDetailNew.Issue' tabindex='6' onchange=onDropDownChange (this); class='inputControl' id='CallProdDetailNew.Issue'></select></td>";
	row += "<td><input type='button' name='delete' value='delete' onclick='jQuery(this).parent().parent().parent().parent().parent().remove()'></input></td>";
	row += "</tr></table></td></tr>";

var e = jQuery("[class='buttonChildTitleBarTD']").filter("[id^='CallProdDetailNew']").get(0);
e.onclick = function() {};
jQuery("[class='buttonChildTitleBarTD']").filter("[id^='CallProdDetailNew']").click(function() {
if ( jQuery("#prodDetail").size() === 0 ) {
jQuery("#CallsProdDetailChildListDiv").next().replaceWith(html);
addCombo();
} else {
jQuery("#prodDetail").append(row);
addCombo();
}
});	
	
}

function addCombo(){
var j = 0; 
var k = 0;
var l = 0;   
alert("INSIDE COMBO");
alert(prodCount);
for(j=0;j<prodCount;j++){
	var prodCombo = document.getElementById("prodNamePrDet");  
    var prodOption = document.createElement("option"); 
	
      	prodOption.text=proditems[j];
		prodOption.value=proditems[j];
alert("prodOption.text:"+prodOption.text);
		 try {  
        prodCombo.add(option, null); //Standard  
        }catch(error) {  
        prodCombo.add(option); // IE only  
        } 
}
/*for(k=0;k<indicationCount;k++){
	var indicationCombo = document.getElementById("CallProdDetailNew.Indication");  
    var indiactionOption = document.createElement("option"); 
	
      	indiactionOption.text=proditems[k];
		indiactionOption.value=proditems[k];
		 try {  
        indicationCombo.add(indiactionOption, null); //Standard  
        }catch(error) {  
        indicationCombo.add(indiactionOption); // IE only  
        } 
}

for(l=0;l<issuesCount;l++){
	var issuesCombo = document.getElementById("CallProdDetailNew.Issue");  
    var issuesOption = document.createElement("option"); 
	
      	issuesOption.text=proditems[l];
		issuesOption.value=proditems[l];
		 try {  
        issuesCombo.add(issuesOption, null); //Standard  
        }catch(error) {  
        issuesCombo.add(issuesOption); // IE only  
        } 
}*/
}

function saveAllDetails()
{
	//alert("Inside Save All details");
	var i;
	var e= $(".buttonTD");
	for(i=0; i < e.length; i++)
	{
		e[i].style.disabled = 'true';
	}

	createNewCallActivity(function() {
		loadCallDetailsPage();
	});

	//createProductDetailed(actId);
	//loadCallDetailsPage();
}

function saveAndNewAllDetails()
{
	//alert("Inside Save All details");
	createNewCallActivity(function() {
		var pathname = window.location.pathname;
		alert(pathname);	
	});
	//createProductDetailed(actId);
	//loadCallDetailsPage();
}

function createWebSerConn(callback)
{
	//alert("creating connection with Web services");
	var userName = 'MERCKTEST_CTE01/pfeil';
	var password = 'method00';
	try{
		jQuery.ajax({
		   url: '/Services/Integration?command=login',
		   dataType: 'xml',
		   beforeSend: function(xhr) {
			   xhr.setRequestHeader('UserName', userName);
			   xhr.setRequestHeader('Password', password);               
		   },
		   complete: function(xhr, textStatus) {
				//alert("created connection with Web services : " + xhr);
				callback.call(this, xhr, textStatus);    
		   }
	   });	
	}
	catch (e) {
		alert('Error: ' + e.message);
	}

}

function getListData(type, xmlData) {
	var arr = [];
	jQuery(type, xmlData).each(function(index, item) {
		var obj = {};
		jQuery(item).children().each(function(index, item) {
		  var fieldName = jQuery(item).get(0).tagName;
		  var fieldValue = jQuery(item).text();
		  obj[fieldName] = fieldValue;
		});
		arr.push(obj);
	});
	return arr;    
}

function getListDataProdDet(type, xmlData) {
	    var arr1 = [];
		//var arr2 = [];
		//var arr3 = [];
		var a=0;
		//var b=0;
		//var c=0;		
		jQuery(type, xmlData).each(function(index, item) {
			var obj1 = {};
		//var obj2 = {};
		//	var obj3 = {};
			jQuery(item).children().each(function(index, item) 
			{
			  var fieldName = jQuery(item).get(0).tagName;
			  var fieldValue = jQuery(item).text();
			  obj1[fieldName] = fieldValue;
			  proditems[a++]=fieldValue;
			  alert("FieldName:"+fieldName+"FieldValue:"+fieldValue);
			  
			/*  var fieldName1 = jQuery(item).get(1).tagName;
			  var fieldValue1 = jQuery(item).text();
			  obj2[fieldName1] = fieldValue1;
			  indicationitems[b++]=fieldValue1;
			  alert(fieldName1+":"+fieldValue1);
			  
			  var fieldName2 = jQuery(item).get(2).tagName;
			  var fieldValue2 = jQuery(item).text();
			  obj3[fieldName2] = fieldValue2;
			  issuesitems[c++] = fieldValue2;
			  alert(fieldName2+":"+fieldValue2); */
			 });
			arr1.push(obj1);
			//arr2.push(obj2);
			//arr3.push(obj3);
			alert("a="+a);
			prodCount = a;
			//indicationCount = b;
			//issuesCount = c;
			
			});
		return arr1;    
	}




function loadCallDetailsPage()
{
	//alert("will load the Call Details page");
	var e= $(".vlk");
	var f= e[0];
	doNavigate(f);
}

function createNewCallActivity(callback){
	//alert("Inside Create New Activity : This will return Activity Id");
	var ownerId = document.getElementById('ContactCallInsert.Owner Id').value;
	var contactPerId = document.getElementById('ContactCallInsert.Contact Per Id').value;
	var subjectValue = document.getElementById('ContactCallInsert.Description').value;
	var objectiveVal = document.getElementById('ContactCallInsert.VONDMED Call').value;
	var startTime = document.getElementById('ContactCallInsert.Planned').value;
	var accId = document.getElementById('ContactCallInsert.Account Id').value;
	//var addressVal = document.getElementById('ContactCallInsert.Personal Location Id').value;
	var smartCallId = document.getElementById('ContactCallInsert.Template Id').value;
	var endTime = document.getElementById('ContactCallInsert.Planned Completion').value;
	var typeVal = document.getElementById('ContactCallInsert.Type').value;
	var statusVal = document.getElementById('ContactCallInsert.Status').value;
	var durationVal = document.getElementById('ContactCallInsert.VONDMED Calc Duration').value;
	var carrencyVal = document.getElementById('ContactCallInsert.Currency Code').value;
	var displayVal = document.getElementById('ContactCallInsert.Display').value;
	var refId = document.getElementById('ContactCallInsert.Sample Reference Number').value;
	var costVal = document.getElementById('ContactCallInsert.Associated Cost').value;
	var paperSignVal = document.getElementById('ContactCallInsert.VONDMED Paper Signature').value;
	var privateVal = document.getElementById('ContactCallInsert.Private').value;
	var descVal = document.getElementById('ContactCallInsert.Comment').value;
	var nextCallVal = document.getElementById('ContactCallInsert.VONDMED Next Call').value;

	var startTimeMod;	
	var endTimeMod;

	if(startTime != null && (startTime.indexOf(' PM') > -1)){
		startTimeMod = startTime.replace(' PM', ':00');
	}
	else if(startTime != null && (startTime.indexOf(' AM') > -1)){
		startTimeMod = startTime.replace(' AM', ':00');	
	}
	else{
		startTimeMod = '';
	}

	if(endTime != null && (endTime.indexOf(' PM') > -1)){
		endTimeMod = endTime.replace(' PM', ':00');
	}
	else if(endTime != null && (endTime.indexOf(' AM') > -1)){
		endTimeMod = endTime.replace(' AM', ':00');	
	}
	else{
		endTimeMod = '';
	}

	//alert('subjectValue : ' + subjectValue);
	if(subjectValue == null || subjectValue == '' || contactPerId == null || contactPerId == ''){
		alert("Subject is the required field!!");
		$("<span class='requiredText'>required</span>").insertAfter("#ContactCallInsert.Description");
		return;
	}
	else{
		var fields = {
			Objective: "" + objectiveVal + "",
			Subject: "" + subjectValue + "",
			OwnerId: "" + ownerId + "",
			Type: "" + typeVal + "",
			AccountId: "" + accId + "",
			SmartCall: "" + smartCallId + "",
			Status: "" + statusVal + "",
			Duration:  "" + durationVal + "",
			CurrencyCode: "" + carrencyVal + "",
			Display: "" + displayVal + "",
			RefNum: "" + refId + "",
			Cost: "" + costVal + "",
			PaperSign: "" + paperSignVal + "",
			Private: "" + privateVal + "",
			Description: "" + descVal + "",
			NextCall: "" + nextCallVal + "",
			StartTime: "" + startTimeMod + "",
			EndTime: "" + endTimeMod + ""
		};
		
		var fieldsCont = {
			ContactId: "" + contactPerId + ""
		};
		createActivityIdUsingWeb(fields, fieldsCont, function(){
			callback.call();
		});	
	}
}

function createActivityIdUsingWeb(fields, fieldsCont, callback)
{
	var activityId;
	createWebSerConn(function(xhr, textStatus){
		var soapAction = 'document/urn:crmondemand/ws/contact/10/2004:ContactInsertChild';
		var soapRequestTemplate = '' +
			'<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">' +
			'   <soapenv:Header/>' +
			'   <soapenv:Body>' +
			'      <ContactWS_ContactInsertChild_Input xmlns="urn:crmondemand/ws/contact/10/2004">' +
			'         <ListOfContact>' +
			'            <Contact>' +
			'               <%=fieldsCont%>' +
			' 		        <ListOfActivity>' +
			'					<Activity>'	+
			'		               <%=fields%>' +				
			'					</Activity>' +				
			'         		</ListOfActivity>' +				
			'            </Contact>' +
			'         </ListOfContact>' +
			'      </ContactWS_ContactInsertChild_Input>' +
			'   </soapenv:Body>' +
			'</soapenv:Envelope>';		

		var fieldsXML = '';
		for (fieldName in fields) {
			fieldsXML += '<' + fieldName + '>' + fields[fieldName] + '</' + fieldName + '>';
		}
		
		var fieldsXMLCont = '';
		for (fieldNameCont in fieldsCont) {
			fieldsXMLCont += '<' + fieldNameCont + '>' + fieldsCont[fieldNameCont] + '</' + fieldNameCont + '>';
		}			

		var soapRequest = soapRequestTemplate.replace("<%=fields%>", fieldsXML);	
		var soapRequestFinal = soapRequest.replace("<%=fieldsCont%>", fieldsXMLCont);	

		//alert("soapRequest : " + soapRequestFinal);

		try{
			jQuery.ajax({
						url: 'https://secure-ausomxapa.crmondemand.com/Services/Integration',
						type: 'POST',
						contentType: 'text/xml',
						dataType: 'xml',
						data: soapRequestFinal,
						beforeSend: function(xhr) {
							//alert("Before sending request to insert : " + xhr);
							xhr.setRequestHeader('SOAPAction', '"' + soapAction + '"');  
						},   
						error: function(errormessage) {
							alert("Error : " + errormessage.responseText);
						},   
						complete: function(xhr, textStatus) {
							//alert("Completed");
						},								
						success: function(xmlData, textStatus) {
							alert("successssfullllllllyy created Activity");
							var items = getListData('Activity', xmlData);
							//alert("items : " + items);
							activityId = items[0].ActivityId;
							//alert("activityId : " + activityId);
							createProductDetailInfo(activityId, function(){
								callback.call();
							});
							//loadCallDetailsPage();
						}
					});	
		}
		catch (e) {
			alert('Error: ' + e.message);
		}
		//return true;
	});

}

function createProductDetailInfo(activityId, callback)
{
	//alert("Getting Product Info");
	var productNameProdet;
	var productNameSamp;
	var bothPresent = false;

	if(document.getElementById('prodNamePrDet') != null && document.getElementById('prodNamePrDet') != '')
	{
		productNameProdet = document.getElementById('prodNamePrDet').value;
	}
	if(document.getElementById('prodNameSamDrop') != null && document.getElementById('prodNameSamDrop') != '')
	{
		productNameSamp = document.getElementById('prodNameSamDrop').value;
	}

	if(productNameProdet != null && productNameProdet != '' && productNameSamp != null && productNameSamp != '')
	{
		bothPresent = true;

		//alert('productNameProdet : ' + productNameProdet);
		var fieldsProdet = {
			ProductId: '',
			Name: " ='" + productNameProdet + "' "
		};	
		callWebServToGetProdInfo(fieldsProdet, activityId, 'ProdDetail', function(){
			if(bothPresent == true){ }
		});	

		//alert('productNameSamp : ' + productNameSamp);
		var fieldsSampDrop = {
			ProductId: '',
			Name: " ='" + productNameSamp + "' "
		};	
		callWebServToGetProdInfo(fieldsSampDrop, activityId, 'SampDrop', function(){
			if(bothPresent == true)
			{
				callback.call();
			}
		});
	}
	else if(productNameProdet != null && productNameProdet != '' && productNameSamp == null)
	{
		//alert('productNameProdet : ' + productNameProdet);
		var fieldsProdet = {
			ProductId: '',
			Name: " ='" + productNameProdet + "' "
		};	
		callWebServToGetProdInfo(fieldsProdet, activityId, 'ProdDetail', function(){
			callback.call();
		});		
	}
	else if(productNameProdet == null && productNameSamp != null && productNameSamp != '')
	{
		//alert('productNameSamp : ' + productNameSamp);
		var fieldsSampDrop = {
			ProductId: '',
			Name: " ='" + productNameSamp + "' "
		};	
		callWebServToGetProdInfo(fieldsSampDrop, activityId, 'SampDrop', function(){
				callback.call();
		});
	}
	else
	{
		callback.call();
	}
}

function callWebServToGetProdInfo(fieldsProdet, activityId, reqFrom, callback)
{
	//alert('Inside callWebServToGetProdInfo');
	createWebSerConn(function(xhr, textStatus){
		var soapAction = 'document/urn:crmondemand/ws/product/10/2004:ProductQueryPage';
		var soapRequestTemplate = '' +
			'<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">' +
			'   <soapenv:Header/>' +
			'   <soapenv:Body>' +
			'      <ProductWS_ProductQueryPage_Input xmlns="urn:crmondemand/ws/product/10/2004">' +
			'         <PageSize>100</PageSize>' +
			'         <ListOfProduct>' +
			'            <Product>' +
			'               <%=fieldsProdet%>' +
			'            </Product>' +
			'         </ListOfProduct>' +
			'         <StartRowNum>0</StartRowNum>' +
			'      </ProductWS_ProductQueryPage_Input>' +
			'   </soapenv:Body>' +
			'</soapenv:Envelope>';		

		var fieldsXML = '';
		for (fieldName in fieldsProdet) {
			fieldsXML += '<' + fieldName + '>' + fieldsProdet[fieldName] + '</' + fieldName + '>';
		}

		var soapRequest = soapRequestTemplate.replace("<%=fieldsProdet%>", fieldsXML);	

		//alert("soapRequest : " + soapRequest);

		try{
			jQuery.ajax({
						url: 'https://secure-ausomxapa.crmondemand.com/Services/Integration',
						type: 'POST',
						contentType: 'text/xml',
						dataType: 'xml',
						data: soapRequest,
						beforeSend: function(xhr) {
							//alert("Before sending request to insert : " + xhr);
							xhr.setRequestHeader('SOAPAction', '"' + soapAction + '"');  
						},   
						complete: function(xhr, textStatus) {
							//alert("Completed");
						},								
						success: function(xmlData, textStatus) {
							//alert("successssfullllllll getting the product Info");
							var items = getListData('Product', xmlData);
							////alert("items : " + items);
							var productId = items[0].ProductId;
							//alert("productId : " + productId);
							//createProductDetailed(activityId, productId);

							if(productId != null)
							{
								if(reqFrom != null && reqFrom == 'ProdDetail')
								{
									callWebServToCreateProdDet(productId, activityId, function(){
										callback.call();
									});
								}
								else if(reqFrom != null && reqFrom == 'SampDrop')
								{
									//alert('Control Came from SampDrop');
									callWebServToCreateSampDrop(productId, activityId, function(){
										callback.call();
									});
								}
								else
								{
									alert('Control not identified');
									return;
								}
							}
							else
							{
								alert('Product Name is not valid!!!');
								return;
							}
						}
					});	
		}
		catch (e) {
			alert('Error: ' + e.message);
		}
		//return true;
	});
}

function callWebServToCreateProdDet(productId, activityId, callback)
{
	var indicationVal = document.getElementById('CallProdDetailNew.Indication').value;
	var priorityVal = document.getElementById('CallProdDetailNew.Priority').value;
	var issueVal = document.getElementById('CallProdDetailNew.Issue').value;

	var fieldsAct = {
		ActivityId: "" + activityId + ""
	};

	var fieldsProd = {
		Name: '',
		ProductId: "" + productId + "",
		Indication: "" + indicationVal + "",
		Priority: "" + priorityVal + "",
		Issue: "" + issueVal + ""
	};

	createWebSerConn(function(xhr, textStatus){
		var soapAction = 'document/urn:crmondemand/ws/activity/10/2004:Activity_InsertChild';
		var soapRequestTemplate = '' +
			'<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">' +
			'   <soapenv:Header/>' +
			'   <soapenv:Body>' +
			'      <ActivityNWS_Activity_InsertChild_Input xmlns="urn:crmondemand/ws/activity/10/2004">' +
			'         <ListOfActivity>' +
			'            <Activity>' +
			'		        <%=fieldsAct%>' +
			'	            <ListOfProductsDetailed>' +
			'		            <ProductsDetailed>' +					
			'		               <%=fieldsProd%>' +
			'		            </ProductsDetailed>' +
			'	            </ListOfProductsDetailed>' +
			'            </Activity>' +
			'         </ListOfActivity>' +
			'      </ActivityNWS_Activity_InsertChild_Input>' +
			'   </soapenv:Body>' +
			'</soapenv:Envelope>';		

		var fieldsXML = '';
		for (fieldName in fieldsProd) {
			fieldsXML += '<' + fieldName + '>' + fieldsProd[fieldName] + '</' + fieldName + '>';
		}
		
		var fieldsActXML = '';
		for (fieldNameAct in fieldsAct) {
			fieldsActXML += '<' + fieldNameAct + '>' + fieldsAct[fieldNameAct] + '</' + fieldNameAct + '>';
		}			

		var soapRequest = soapRequestTemplate.replace("<%=fieldsProd%>", fieldsXML);	
		var finalSoapRequest = soapRequest.replace("<%=fieldsAct%>", fieldsActXML);	

		//alert("soapRequest : " + finalSoapRequest);

		try{
			jQuery.ajax({
						url: 'https://secure-ausomxapa.crmondemand.com/Services/Integration',
						type: 'POST',
						contentType: 'text/xml',
						dataType: 'xml',
						data: finalSoapRequest,
						beforeSend: function(xhr) {
							//alert("Before sending request to insert : " + xhr);
							xhr.setRequestHeader('SOAPAction', '"' + soapAction + '"');  
						},   
						complete: function(xhr, textStatus) {
							//alert("Completed");
						},								
						success: function(xmlData, textStatus) {
						alert("successssfullllllllyy created the Product detailed");
						var items = getListDataProdDet('ProductsDetailed', xmlData);
						alert("items : " + items);
						callback.call();
							//loadCallDetailsPage();
						}
					});	
		}
		catch (e) {
			alert('Error: ' + e.message);
		}
		//return true;
	});
}

function callWebServToCreateSampDrop(productId, activityId, callback)
{
	var prodCategory = document.getElementById('CallSampDropNew.Primary Product Line Name').value;
	var lotNumber = document.getElementById('CallSampDropNew.LOT Name').value;
	var qtyVal = document.getElementById('CallSampDropNew.Quantity').value;

	var fieldsAct = {
		ActivityId: "" + activityId + ""
	};

	var fieldsProd = {
		ProductId: "" + productId + "",
		ProductCategory: "" + prodCategory + "",
		Quantity: "" + qtyVal + "",
		LotNumber: "" + lotNumber + ""
	};

	createWebSerConn(function(xhr, textStatus){
		var soapAction = 'document/urn:crmondemand/ws/activity/10/2004:Activity_InsertChild';
		var soapRequestTemplate = '' +
			'<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">' +
			'   <soapenv:Header/>' +
			'   <soapenv:Body>' +
			'      <ActivityNWS_Activity_InsertChild_Input xmlns="urn:crmondemand/ws/activity/10/2004">' +
			'         <ListOfActivity>' +
			'            <Activity>' +
			'		        <%=fieldsAct%>' +
			'	            <ListOfSampleDropped>' +
			'		            <SampleDropped>' +					
			'		               <%=fieldsProd%>' +
			'		            </SampleDropped>' +
			'	            </ListOfSampleDropped>' +
			'            </Activity>' +
			'         </ListOfActivity>' +
			'      </ActivityNWS_Activity_InsertChild_Input>' +
			'   </soapenv:Body>' +
			'</soapenv:Envelope>';		

		var fieldsXML = '';
		for (fieldName in fieldsProd) {
			fieldsXML += '<' + fieldName + '>' + fieldsProd[fieldName] + '</' + fieldName + '>';
		}
		
		var fieldsActXML = '';
		for (fieldNameAct in fieldsAct) {
			fieldsActXML += '<' + fieldNameAct + '>' + fieldsAct[fieldNameAct] + '</' + fieldNameAct + '>';
		}			

		var soapRequest = soapRequestTemplate.replace("<%=fieldsProd%>", fieldsXML);	
		var finalSoapRequest = soapRequest.replace("<%=fieldsAct%>", fieldsActXML);	

		//alert("soapRequest : " + finalSoapRequest);

		try{
			jQuery.ajax({
						url: 'https://secure-ausomxapa.crmondemand.com/Services/Integration',
						type: 'POST',
						contentType: 'text/xml',
						dataType: 'xml',
						data: finalSoapRequest,
						beforeSend: function(xhr) {
							//alert("Before sending request to insert : " + xhr);
							xhr.setRequestHeader('SOAPAction', '"' + soapAction + '"');  
						},   
						complete: function(xhr, textStatus) {
							//alert("Completed");
						},								
						success: function(xmlData, textStatus) {
							alert("successssfullllllllyy created the Sample dropped");
							callback.call();
						}
					});	
		}
		catch (e) {
			alert('Error: ' + e.message);
		}
		//return true;
	});
}
function SideMenuView() {
	var header = require('/ui/table/MenuHeader');
	
	// colors
	var rowColor = "#29282d",
		rowTextColor = "#cbcacf",
		headerColor = "#171719",
		headerTextColor = "#7f7f7f";
		
	// row data generator
	var rowData = function(title, data){
		return {
			title: title, 
			data: data, 
			height: 40,
			font: {
				fontSize:17, 
				fontWeight:'normal'
			},
			color: rowTextColor, 
			backgroundColor: rowColor
		}
	}
	
	//create object instance, a parasitic subclass of Observable
	var self = Ti.UI.createWindow({
		backgroundColor: '#000000',
		top:   0,
		left:  0,
		width: 200,
		zIndex: 1,
		visible: false
	});
	
	var data = [];
	var mainSection, mrow1, mrow2, mrow3;
	
	// first section
	mainSection = Ti.UI.createTableViewSection(); //{headerTitle: "Основное", backgroundColor:"#d6d0b7" });
	mainSection.headerView = header("Основное", headerTextColor, headerColor);
	mrow1 = Ti.UI.createTableViewRow(rowData("Посты", 'posts'));
	mrow2 = Ti.UI.createTableViewRow(rowData("Мои вещи", 'mystuff'));
	mrow3 = Ti.UI.createTableViewRow(rowData("Инбокс", 'inbox'));
	mainSection.add(mrow1);
	mainSection.add(mrow2);
	mainSection.add(mrow3);
	data.push(mainSection);
	
	// second section
	mainSection = Ti.UI.createTableViewSection(); //{headerTitle: "Моё"});
	mainSection.headerView = header("Моё", headerTextColor, headerColor);
	mrow1 = Ti.UI.createTableViewRow(rowData("Профиль", 'profile'));
	mrow2 = Ti.UI.createTableViewRow(rowData("Избранное", 'favs'));
	mrow3 = Ti.UI.createTableViewRow(rowData("Мои подлепры", 'mysubs'));
	mainSection.add(mrow1);
	mainSection.add(mrow2);
	mainSection.add(mrow3);
	data.push(mainSection);
	
	// third section
	mainSection = Ti.UI.createTableViewSection(); //{headerTitle: "Лепра"});
	mainSection.headerView = header("Лепра", headerTextColor, headerColor);
	mrow1 = Ti.UI.createTableViewRow(rowData("Чятик", 'chat'));
	mrow2 = Ti.UI.createTableViewRow(rowData("Блоги империи", 'subs'));
	mrow3 = Ti.UI.createTableViewRow(rowData("Белый дом", 'gov'));
	mainSection.add(mrow1);
	mainSection.add(mrow2);
	mainSection.add(mrow3);
	data.push(mainSection);
	
	// last section
	mainSection = Ti.UI.createTableViewSection(); //{headerTitle: "Прочее"});
	mainSection.headerView = header("Прочее", headerTextColor, headerColor);
	mrow1 = Ti.UI.createTableViewRow(rowData("Выход", 'exit'));
	mainSection.add(mrow1);
	data.push(mainSection);
	
	// Facebook like menu window
	var tableView = Ti.UI.createTableView({data:data, separatorColor: "#343338"});
	self.add(tableView);
	
	tableView.addEventListener('click', function(e){
		Ti.App.fireEvent('iLepraMenuSelect', {entry: e.row.data});
	});
	
	return self;
}

module.exports = SideMenuView;

class Table{
  constructor(idName, headerList){
    this.headerList = headerList;
    this.idName = idName;
    this.table = null;
    this.tableBody = null;
    this.tableHeader = null;
    this.isRendered = false;
  }
  render(){
    this.table = document.getElementById(this.idName);
    this.table.append(this.tableHeader);
    this.table.append(this.tableBody);
    this.isRendered = true;
  }
  create(dataList){
    this.tableBody = document.createElement('tbody');
    dataList.forEach((i, idx) =>{
        let tr = document.createElement('tr');
        for(let key in i){
          if(key !== 'id'){
           let td = document.createElement('td');
            td.innerHTML = i[key];
            tr.append(td); 
          }
        }
      this.tableBody.append(tr);
    });
    this.tableHeader = document.createElement('thead');
    let tr = document.createElement('tr');
    this.headerList.forEach(i => {
      let th = document.createElement('th');
      th.innerHTML = i;
      tr.append(th)
      this.tableHeader.append(tr);
    })
  }
  update(dataList){
  		if(this.isRendered && dataList){
	  		this.tableBody.remove();
	  		this.tableHeader.remove();
	  		this.create(dataList);
	  		this.render();
  		}
  }
}

export default Table
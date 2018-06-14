module.exports = (data) => `<!doctype html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Font Awesome -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
<link rel="stylesheet" href="https://cdn.datatables.net/1.10.16/css/jquery.dataTables.min.css">
<link href="https://cdn.datatables.net/fixedcolumns/3.0.2/css/dataTables.fixedColumns.min.css" rel="stylesheet">
<link href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.0.0/css/bootstrap.css" rel="stylesheet">

 

<!-- JQuery -->
    <script type="text/javascript" src="https://code.jquery.com/jquery-3.3.1.js"></script></script>
    <!-- Bootstrap core JavaScript -->
   
    

    <script src="https://cdn.datatables.net/1.10.16/js/jquery.dataTables.min.js"></script>
    <script src="https://cdn.datatables.net/1.10.16/js/dataTables.bootstrap4.min.js"></script>
     <script src="https://cdn.datatables.net/fixedcolumns/3.2.4/js/dataTables.fixedColumns.min.js"></script>
 
    



    

  </head>
  <body>
   <h3 style="  background: #00a9d5; background-image: url('../paper.png'); height: 250px; color: white;
    background-size: 100% 100%;   font-size: 150px;  text-align: center;text-shadow:2px 8px 10px rgba(255, 255, 255, 0.4)   " >תוצאות</h3>
    <table  id="example" class="table  table-hover table-bordered table-responsive-md">
        <thead>
          <tr >
          <th style="background-color: #004988;color: white; border-color: #004988;" scope="col">#</th>
          <th style="background-color: #004988;color: white; border-color: #004988;" scope="col">שם</th>
              ${data.columns.map(c =>
      `<th scope="col"><img style="margin-right: 10px;width:30px;height:30px"src="../משחק המונדיאל 2018 - הארץ_files/${c[0]}.png"> </img>-<img style="margin-left: 10px;width:30px;height:30px"src="../משחק המונדיאל 2018 - הארץ_files/${c[1]}.png"> </img></th>`
             ).toString().replace(/\,/g, '')}
             <th style="background-color: #004988;color: white; border-color: #004988;" scope="col">ציון</th>
         </tr>
        </thead>
        <tbody>
         ${data.rows.map((r, index) =>
    `<tr >
          <th   style=" background-color: #004988;color: white; border-color: #004988;" "scope="row">${index}</th>
           ${Object.values(r).map((tr,i)=>(i==0||i==49)?`<td  style="background-color: #004988;color: white; border-color: #004988;"" style="text-align:center;">${tr}</td>`:
            `<td style="background-color:${data.correct[i-1]=='nan'?'white':data.correct[i-1]==tr?'#a4e4a4': '#f7abab'}; border-bottom-color: white;border-top-color: white; text-align: center;"><img style="margin-right: 10px;width:20px;height:20px"src="../משחק המונדיאל 2018 - הארץ_files/${tr}.png"/> </td>`).toString().replace(/\,/g, '')}
        </tr>` ).toString().replace(/\,/g, '')}
        </tbody>
        </table>
     
<script>
$(document).ready(function() {
  $('#example').DataTable({
   
    scrollX: true,
    scrollY: "650px",
    scrollCollapse: true,
    paging:false,
    fixedHeader: true,
    columnDefs: [
      { "width": "100px", "targets": Array(50).fill(0).map(Number.call, Number) }
      ],
      fixedColumns:   {
        leftColumns: 2,
        rightColumns: 1,
    },
    bInfo : false
   
    
  });
  $('.dataTables_wrapper').find('label').each(function() {
    $(this).parent().append($(this).children());
  });
  $('.dataTables_filter').find('input').each(function() {
    $('input').attr("placeholder", "Search");
    $('input').removeClass('form-control-sm');
  });
  $('.dataTables_length').addClass('d-flex flex-row');
  $('.dataTables_filter').addClass('md-form');
  $('select').addClass('mdb-select');
 
  $('.mdb-select').removeClass('form-control form-control-sm');
  $('.dataTables_filter').find('label').remove();
});
</script>      
    </body>
</html>`
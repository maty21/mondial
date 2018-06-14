module.exports = (data) => `<!doctype html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Font Awesome -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
<!-- Bootstrap core CSS -->
<link href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.0.0/css/bootstrap.min.css" rel="stylesheet">
<!-- Material Design Bootstrap -->
<link href="https://cdnjs.cloudflare.com/ajax/libs/mdbootstrap/4.4.5/css/mdb.min.css" rel="stylesheet">


    <!-- JQuery -->
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <!-- Bootstrap tooltips -->
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.13.0/umd/popper.min.js"></script>
    <!-- Bootstrap core JavaScript -->
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.0.0/js/bootstrap.min.js"></script>
    <!-- MDB core JavaScript -->
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mdbootstrap/4.5.0/js/mdb.min.js"></script>




    <script src="https://cdn.datatables.net/1.10.16/js/jquery.dataTables.min.js"></script>
<script src="https://cdn.datatables.net/1.10.16/js/dataTables.bootstrap4.min.js"></script>

    <style>
    .dataTables_length label {
      margin-right: 1rem;
      padding-top: 1rem;
  }
  .dataTables_filter.md-form {
      margin-top: .55rem;
  }
  .dataTables_filter.md-form input{
      font-weight: 300;
  }
  .dataTables_wrapper .row {
      margin-bottom: 1.5rem;
  }
  div.dataTables_wrapper div.dataTables_info {
      padding-top: 0;
      padding-bottom: 1rem;
  }
  .dataTables_paginate {
      float: right;
  }
  .dataTables_filter {
      float: right;
  }
   COPY CODE
  Table with sorting
  Basic example
  
    </style>
  </head>
  <body>
   <h3 style="  background: #00a9d5; background-image: url('../paper.png'); height: 250px; color: white;
    background-size: 100% 100%;   font-size: 150px;  text-align: center;text-shadow:2px 8px 10px rgba(255, 255, 255, 0.4)   " >תוצאות</h3>
    <table  id="example" class="table table-striped table-hover table-bordered table-responsive-md">
        <thead>
          <tr >
          <th scope="col">#</th>
          
              ${data.columns.map(c =>
    `<th scope="col">${c}</th>`
  ).toString().replace(/\,/g, '')}
         </tr>
        </thead>
        <tbody>
         ${data.rows.map((r, index) =>
    `<tr >
          <th scope="row">${index}</th>
           ${Object.values(r).map(tr => `<td>${tr}</td>`).toString().replace(/\,/g, '')}
        </tr>` ).toString().replace(/\,/g, '')}
        </tbody>
        </table>
    

<script>
$(document).ready(function() {
  $('#example').DataTable({
    "pageLength": 50
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
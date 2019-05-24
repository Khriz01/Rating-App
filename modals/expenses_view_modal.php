<div id="expenses_view_modal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true" style="display: none; overflow-y: scroll;" data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog modal-md-edited">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title" id="myLargeModalLabel">Detalle de Gastos</h4>
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-12">
                  <div class="card ">
                    <div class="card-body">
                      <div class="card-body">
                        <div class="row m-t-10">
                          <div class="col-12">
                              <div class="table-responsive">
                                  <table id="expenses-table" class="display nowrap table table-hover ">
                                      <thead>
                                          <tr>
                                              <th style="min-width:50%">Nombre</th>
                                              <th style="min-width:25%">Total</th>
                                              <th style="min-width:25%"></th>
                                          </tr>
                                      </thead>
                                  </table>
                              </div>
                          </div>
                        </div>
                        <br>
                      </div>
                    </div>
                    </div>
                  </div>
                </div> <!-- SCROLL -->
              </div> <!-- modal body -->
              <div class="modal-footer">
                  <div class="row">
                    <div class="col-md-12">
                      <button type="button" class="btn btn-outline-danger text-left" data-dismiss="modal" id="btn-exit1"><i class="mdi mdi-exit-to-app"></i> Cerrar</button>
                    </div>
                  </div>
              </div> <!-- modal footer -->
          </div>
      </div>
  </div>
  <!-- /.modal-content -->

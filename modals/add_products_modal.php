<div id="add_products_modal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true" style="display: none; overflow-y: scroll;" data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog modal-md-edited">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title" id="myLargeModalLabel">Detalle Productos</h4>
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-12">
                  <div class="card ">
                    <div class="card-body">
                      <div class="card-body">
                        <form class="floating-labels m-t-10">
                          <div class="row m-t-10">
                            <div class="col-sm-12 col-md-6 form-group" id="product_father">
                              <select class="form-control custom-select select2" id="id_product">
                                  <option value="0">-Seleccione-</option>
                              </select>
                              <span class="bar"></span>
                              <label for="id_product">Producto</label>
                            </div>
                            <div class="col-sm-12 col-md-3 form-group">
                              <input type="text" class="form-control numeric" type="number" min="0.00" id="total">
                              <span class="bar"></span>
                              <label for="total">Cantidad</label>
                            </div>
                            <div class="col-sm-12 col-md-3 text-right">
                              <button type="button" class="btn btn-outline-info waves-effect" id="btn-add-product"><i class="mdi mdi-save"></i> Guardar</button>
                            </div>
                          </div>
                        </form>
                        <div class="row m-t-10">
                          <div class="col-12">
                              <div class="table-responsive">
                                  <table id="deta-table" class="display nowrap table table-hover ">
                                      <thead>
                                          <tr>
                                              <th style="min-width:50%">Producto</th>
                                              <th style="min-width:25%">Total</th>
                                              <th style="min-width:25%"></th>
                                          </tr>
                                      </thead>
                                  </table>
                              </div>
                          </div>
                        </div>
                        <br>
                        <form class="floating-labels m-t-10">
                          <div class="row">
                            <div class="col-lg-12 col-md-12 col-sm-12">
                              <div class="form-group">
                                <textarea name="" id="description" value="" class="form-control" row="2"></textarea>
                                <span class="bar"></span>
                                <label for="description">Descripcion</label>
                              </div>
                              </div>
                          </div>
                        </form>
                      </div>
                    </div>
                    </div>
                  </div>
                </div> <!-- SCROLL -->
              </div> <!-- modal body -->
              <div class="modal-footer">
                  <div class="row">
                    <div class="col-md-12">
                      <button type="button" class="btn btn-outline-success waves-effect text-left" id="product_confirm"><i class="mdi mdi-exit-to-app"></i> Aceptar</button>
                    </div>
                  </div>
              </div> <!-- modal footer -->
          </div>
      </div>
  </div>
  <!-- /.modal-content -->

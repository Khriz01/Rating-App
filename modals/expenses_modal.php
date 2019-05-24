<div id="expenses-modal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true" style="display: none;" data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog modal-md-edited">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title" id="myLargeModalLabel">Gastos</h4>
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            </div>
            <div class="modal-body">
              <div class="row">
                  <div class="col-12">
                    <div class="card card-outline-success">
                      <div class="card-body">
                        <h4 class="card-title">Detalle de Gastos</h4>
                        <div class="row">
                          <div class="col-lg-3 col-sm-12">

                          </div>
                          <div class="col-lg-6 col-sm-12">
                            <div class="card">
                                <div class="card-body">
                                  <div class="row">
                                    <div class="col-12" id="path1">
                                      <input type="file" id="file-picture" class="dropify"/>
                                    </div>
                                  </div>
                                </div>
                            </div>
                          </div><!-- div imagen de usuario -->
                          <div class="col-lg-3 col-md-3 col-sm-12">

                          </div>
                        </div>
                        <form class="floating-labels m-t-30">
                          <div class="row">
                            <div class="col-lg-6 col-md-6 col-sm-12">
                              <div class="form-group">
                                <input type="text" name="" value="" class="form-control" id="name">
                                <span class="bar"></span>
                                <label for="name">Nombre</label>
                              </div>
                            </div>
                            <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6 m-b-30">
                              <div class="form-group">
                                <!-- <label for="fecha">Fecha</label> -->
                                <input type="text" class="form-control date-picker" id="date2">
                                <span class="bar"></span>
                                <label for="date2">Fecha</label>
                              </div>
                            </div>

                        </div>
                        <div class="row m-t-10">
                          <div class="col-lg-6 col-md-6 col-sm-12 m-t-5">
                            <div class="form-group">
                              <select class="form-control select custom-select" id="id_reason1" placeholder="Seleccione Motivo">
                                <option value="0">Selecione</option>
                              </select>
                              <span class="bar"></span>
                              <label for="id_reason1">Motivo</label>
                            </div>
                          </div>
                          <div class="col-lg-6 col-md-6 col-sm-12">
                            <div class="form-group">
                              <input type="number" name="" value="" class="form-control numeric" id="amount1">
                              <span class="bar"></span>
                              <label for="amount1">Cantidad</label>
                            </div>
                          </div>


                        </div>
                        <div class="row">
                          <div class="col-lg-12 col-md-12 col-sm-12">
                            <div class="form-group">
                              <textarea name="" id="description1" value="" class="form-control" row="2"></textarea>
                              <span class="bar"></span>
                              <label for="description1">Descripcion</label>
                            </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            <div class="modal-footer">
                <div class="row">
                  <div class="col-md-12">
                    <button type="button" class="btn btn-outline-success text-left" id="btn-save"><i class="mdi mdi-check"></i> Guardar</button>
                    <button type="button" class="btn btn-outline-danger text-left" data-dismiss="modal" id="btn-exit1"><i class="mdi mdi-exit-to-app"></i> Cerrar</button>
                  </div>
                </div>
            </div>
        </div>
    </div>
</div>
        <!-- /.modal-content -->

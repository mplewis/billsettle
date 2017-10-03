class ImportInvoiceController < ApplicationController
  def index
  end

  def create
    params.require :assignee
    data = params[:csv].tempfile.read
    assignee = User.find params[:assignee]
    @imported = InvoiceImporter.import_csv data, current_user, assignee
  end
end

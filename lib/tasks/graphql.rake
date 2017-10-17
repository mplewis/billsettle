namespace :graphql do
  task schema: :environment do
    puts GraphQL::Schema::Printer.print_schema(BillsettleSchema)
  end
end

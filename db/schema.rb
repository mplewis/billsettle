# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20171008215816) do

  create_table "line_items", force: :cascade do |t|
    t.datetime "date"
    t.text "desc"
    t.text "desc_orig"
    t.integer "cents"
    t.integer "txn_type"
    t.text "account"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "category"
    t.integer "creator_id"
    t.integer "assignee_id"
    t.text "note"
    t.integer "status", default: 1
    t.integer "debt_owner"
    t.index ["assignee_id"], name: "index_line_items_on_assignee_id"
    t.index ["creator_id"], name: "index_line_items_on_creator_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string "current_sign_in_ip"
    t.string "last_sign_in_ip"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

end

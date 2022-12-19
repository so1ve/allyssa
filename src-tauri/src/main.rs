#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use tauri::{command, generate_context, generate_handler, Builder};

mod document;
mod utils;

use document::{get_document, get_documents, new_document, update_document};
use utils::ensure_documents_dir;

#[command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

fn main() {
    ensure_documents_dir();
    Builder::default()
        .invoke_handler(generate_handler![
            greet,
            new_document,
            update_document,
            get_document,
            get_documents
        ])
        .run(generate_context!())
        .expect("error while running tauri application");
}

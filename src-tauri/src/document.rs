use serde::{Deserialize, Serialize};
use std::fs;
use std::io::Write;
use tauri::command;

use crate::utils::{get_document_name, resolve_documents_path};
// use anyhow::{Result};

#[derive(Serialize, Deserialize)]
pub struct Document {
    sentences: Vec<String>,
    phrases: Vec<String>,
}

#[command]
pub fn new_document(name: &str) -> Result<(), String> {
    let filename = get_document_name(name);
    if filename.exists() {
        return Err("Document already exists".into());
    }
    let file = fs::File::create(&filename);
    let payload = Document {
        sentences: vec![],
        phrases: vec![],
    };
    if let Ok(mut file) = file {
        file.write_all(serde_json::to_string(&payload).unwrap().as_bytes())
            .unwrap();
    } else {
        return Err("Could not create document".into());
    }
    Ok(())
}

#[command]
pub fn update_document(name: &str, payload: Document) -> bool {
    let filename = get_document_name(name);
    let mut file = fs::File::create(&filename).unwrap();
    let serialized = serde_json::to_string(&payload);
    if let Ok(ref string_payload) = serialized {
        file.write_all(string_payload.as_bytes()).unwrap();
    }
    serialized.is_ok()
}

#[command]
pub fn get_document(name: &str) -> Option<Document> {
    let filename = get_document_name(name);
    if let Ok(content) = fs::read_to_string(&filename) {
        if let Ok(payload) = serde_json::from_str::<Document>(&content) {
            Some(payload)
        } else {
            None
        }
    } else {
        None
    }
}

#[command]
pub fn get_documents() -> Vec<String> {
    // Order by last modified
    let mut documents = vec![];
    if let Ok(paths) = fs::read_dir(resolve_documents_path()) {
        for path in paths {
            if let Ok(path) = path {
                if let Some(filename) = path.file_name().to_str() {
                    documents.push(filename.to_string().replace(".json", ""));
                }
            }
        }
    }
    documents
}

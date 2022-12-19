use std::path::PathBuf;

// Get the path to the document directory
// E.g on windows: C:\Users\username\Documents\AllyssaDocuments
// on linux: /home/username/Documents/AllyssaDocuments
// on mac: /Users/username/Documents/AllyssaDocuments
pub fn resolve_documents_path() -> PathBuf {
    let mut path = dirs::document_dir().unwrap();
    path.push("AllyssaDocuments");
    path
}

pub fn ensure_documents_dir() {
    let path = resolve_documents_path();
    if !path.exists() {
        std::fs::create_dir(&path).unwrap();
    }
}

pub fn get_document_name(name: &str) -> PathBuf {
    let mut filename = resolve_documents_path();
    filename.push(name);
    filename.set_extension("json");
    filename
}

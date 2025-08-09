export interface FileRecord {
  id: string;
  originalName: string;
  mimeType: string;
  size: number;
  buffer: Buffer; // in-memory for dev
  uploadedAt: string;
  ownerId?: string;
}

class FilesRepo {
  private files: Map<string, FileRecord> = new Map();

  save(file: Omit<FileRecord, 'id'|'uploadedAt'>) {
    const id = `file_${Date.now()}_${Math.random().toString(36).slice(2,6)}`;
    const rec: FileRecord = { id, uploadedAt: new Date().toISOString(), ...file };
    this.files.set(id, rec);
    return rec;
  }

  get(id: string) {
    return this.files.get(id);
  }

  list() {
    return Array.from(this.files.values()).map(({ buffer, ...meta }) => meta);
  }

  delete(id: string) {
    return this.files.delete(id);
  }
}

export const filesRepo = new FilesRepo();



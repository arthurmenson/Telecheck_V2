export interface Program {
  id: string;
  title: string;
  description: string;
  type: 'rolling-start' | 'fixed-start';
  status: 'active' | 'archived' | 'draft';
  category?: string;
  price?: number;
  createdAt: string;
}

export interface Participant {
  id: string;
  programId: string;
  userId: string;
  enrollmentDate: string;
  status: 'enrolled' | 'active' | 'completed' | 'dropped';
}

class ProgramsRepo {
  programs: Map<string, Program> = new Map();
  participants: Map<string, Participant[]> = new Map(); // by programId

  list(): Program[] { return Array.from(this.programs.values()); }

  create(input: Omit<Program, 'id'|'createdAt'>): Program {
    const id = `prog_${Date.now()}_${Math.random().toString(36).slice(2,6)}`;
    const p: Program = { id, createdAt: new Date().toISOString(), ...input };
    this.programs.set(id, p);
    return p;
  }

  update(id: string, input: Partial<Program>): Program | undefined {
    const p = this.programs.get(id);
    if (!p) return undefined;
    const next = { ...p, ...input, id } as Program;
    this.programs.set(id, next);
    return next;
  }

  remove(id: string): boolean { return this.programs.delete(id); }

  enroll(programId: string, userId: string): Participant {
    const list = this.participants.get(programId) || [];
    const participant: Participant = {
      id: `part_${Date.now()}_${Math.random().toString(36).slice(2,6)}`,
      programId,
      userId,
      enrollmentDate: new Date().toISOString(),
      status: 'enrolled',
    };
    list.push(participant);
    this.participants.set(programId, list);
    return participant;
  }

  listParticipants(programId: string): Participant[] {
    return this.participants.get(programId) || [];
  }

  analytics(programId: string) {
    const total = this.listParticipants(programId).length;
    return { programId, totalParticipants: total, completionRate: 0.25 };
  }
}

export const programsRepo = new ProgramsRepo();



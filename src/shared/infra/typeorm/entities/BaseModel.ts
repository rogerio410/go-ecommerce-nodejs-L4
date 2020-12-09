import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

abstract class BaseModel {
  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default BaseModel;

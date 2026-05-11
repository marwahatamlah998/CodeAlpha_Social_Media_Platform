import pool from "@/app/models/lib/db";

export type Role = {
  id?: number;
  role_name: string;
};

export const AddRole = async (role: Role) => {
  const result = await pool.query<Role>(
    `INSERT INTO roles (role_name) VALUES ($1) RETURNING *`,
    [role.role_name],
  );

  const roles = result.rows[0];
  if (roles) {
    return {
      role_name: roles.role_name,
    };
  }
};

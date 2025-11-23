model College{
 id Int @id @default(autoincrement())
 name String
 description String
 phone String
 website_url String
 slug String
 college_email String 
 key_points String
 banner_url String
 college_logo String
 created_at DateTime @default(now())
 updated_at DateTime @default(now()) @updatedAt
}

model affiliation{
 id Int @id @default(autoincrement())
  name String
  created_at DateTime @default(now())
  updated_at DateTime @default(now()) @updatedAt
}

model Rating{
 id Int @id @default(autoincrement())
  rating Float
  created_at DateTime @default(now())
  updated_at DateTime @default(now()) @updatedAt
}

model course{
 id Int @id @default(autoincrement())
  year Int
  name String
   created_at DateTime @default(now())
  updated_at DateTime @default(now()) @updatedAt
}

model Review{
 id Int @id @default(autoincrement())
  academic_score Int
  faculty_score Int
  infrastructure_score Int
  social_score Int
  career_score Int
  experience String
  photos String[]
   created_at DateTime @default(now())
  updated_at DateTime @default(now()) @updatedAt
}

import { prisma } from "../../src/core/db/prisma";


async function main() {
  console.log(" Seeding database dummy data for folders...");

  try {
    const rootDocs = await prisma.folder.create({
      data: {
        name: "Documents",
        parentId: null,
      },
    });

    const rootPics = await prisma.folder.create({
      data: {
        name: "Pictures",
        parentId: null,
      },
    });

    const rootMusic = await prisma.folder.create({
      data: {
        name: "Music",
        parentId: null,
      },
    });

    // --- Subfolders ---
    const workFolder = await prisma.folder.create({
      data: {
        name: "Work",
        parentId: rootDocs.id,
      },
    });

    const personalFolder = await prisma.folder.create({
      data: {
        name: "Personal",
        parentId: rootDocs.id,
      },
    });

    const holidayPics = await prisma.folder.create({
      data: {
        name: "Holiday 2024",
        parentId: rootPics.id,
      },
    });

    const baliFolder = await prisma.folder.create({
      data: {
        name: "Bali Trip",
        parentId: holidayPics.id,
      },
    });

    // --- Files ---
    await prisma.file.createMany({
      data: [
        { name: "resume.pdf", folderId: workFolder.id },
        { name: "project-proposal.docx", folderId: workFolder.id },
        { name: "notes.txt", folderId: personalFolder.id },
        { name: "beach.png", folderId: baliFolder.id },
        { name: "sunset.jpg", folderId: holidayPics.id },
        { name: "song.mp3", folderId: rootMusic.id },
      ],
    });

    console.log("Dummy data for folders seed completed!");
  } catch (error) {
    console.error("Error during folder seeding:", error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error("Error seeding dummy data for folders:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

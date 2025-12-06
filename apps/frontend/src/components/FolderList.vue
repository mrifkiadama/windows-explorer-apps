<script setup lang="ts">
import type { FolderNode } from '../api/types';
import { getChildren } from '../api/useFolder';
import { ref, onMounted, watch } from 'vue';

const props = defineProps<{
    folders: FolderNode[];
    files: unknown[];
}>();

const folderLists = ref<FolderNode[]>([]);
const fileLists = ref<unknown[]>([]);

onMounted(() => {
    folderLists.value = props.folders;
    fileLists.value = props.files;
});

watch(() => props.folders, (newFolders) => {
    folderLists.value = newFolders;
});

watch(() => props.files, (newFiles) => {
    fileLists.value = newFiles;
});

const handleFolderClick = async (folder: FolderNode) => {
    const res = await getChildren(folder.id);
    folderLists.value = res.data.folders;
    fileLists.value = res.data.files;
};
</script>

<template>
    <div class="right-panel">
        <h3>Contents</h3>
        <div v-if="!folderLists.length && !fileLists.length">
            <p>No subfolders or files.</p>
        </div>

        <div class="grid">
            <div 
                v-for="f in folderLists" 
                :key="f.id" 
                class="item folder-item"
                @click="handleFolderClick(f)"
            >
                <div>
                    <div class="item-icon">📁</div>
                    <div class="item-name">{{ f.name }}</div>
                </div>
            </div>

            <div v-for="(file, index) in fileLists" :key="index" class="item file-item">
                <div class="item-icon">📄</div>
                <div class="item-name">{{ (file as any).name }}</div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.right-panel {
    padding: 0.75rem;
}

.grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 0.75rem;
}

.item {
    border: 1px solid #e2e8f0;
    padding: 0.75rem;
    border-radius: 8px;
    background: #ffffff;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    min-height: 80px;
    justify-content: center;
}

.item:hover {
    border-color: #3b82f6;
    box-shadow: 0 2px 8px rgba(59, 130, 246, 0.15);
    transform: translateY(-1px);
}

.item-icon {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
}

.item-name {
    font-size: 0.875rem;
    color: #374151;
    word-break: break-word;
    line-height: 1.3;
}

.folder-item:hover .item-icon {
    transform: scale(1.1);
}

.file-item:hover .item-icon {
    transform: scale(1.1);
}
</style>

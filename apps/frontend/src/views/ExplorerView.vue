<script setup lang="ts">
import { ref, onMounted } from 'vue';
import FolderTree from '../components/FolderTree.vue';
import FolderList from '../components/FolderList.vue';
import { getFolderTree, getChildren } from '../api/useFolder';
import type { FolderNode, File } from '../api/types';

const tree = ref<FolderNode[]>([]);
const selectedFolder = ref<FolderNode | null>(null);
const childFolders = ref<FolderNode[]>([]);
const files = ref<File[]>([]);

const loadTree = async () => {
    const response= await getFolderTree();
    tree.value = response.data
};

const loadChildren = async (folder: FolderNode | null) => {
    selectedFolder.value = folder;
    const folderId = folder ? folder.id : null;
    const res = await getChildren(folderId);
    childFolders.value = res.data.folders;
    files.value = res.data.files;
};

const handleSelect = async (folder: FolderNode | null) => {
    await loadChildren(folder);
};

onMounted(async () => {
    await loadTree();
});


</script>

<template>
    <div class="explorer">
        <div class="left">
            <h3>Folders</h3>
            <FolderTree :nodes="tree" :selected-id="selectedFolder?.id ?? null" @select="handleSelect" />
        </div>

        <div class="divider"></div>

        <div class="right">
            <FolderList :folders="childFolders" :files="files as unknown as File[]" />
        </div>
    </div>
</template>

<style scoped>
.explorer {
    display: grid;
    grid-template-columns: 1fr auto 2fr;
    height: 100vh;
}

.left {
    border-right: 1px solid #ddd;
    padding: 0.75rem;
    overflow-y: auto;
}

.right {
    overflow-y: auto;
}

.divider {
    width: 1px;
    background: #ddd;
}
</style>

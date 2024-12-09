import { sum } from "../lib/index.js";

function findLargestId(disk, completed) {
    for (let i = 0; i < disk.length; i++) {
        const id = disk[disk.length - 1 - i];
        if (id == null || completed.has(id)) continue;
        return { id, index: disk.length - 1 - i };
    }
    return { id: null, index: null };
}

function getSizeOfFile(id, index, disk) {
    let size = 0;
    while (true) {
        if (disk[index] === id) {
            size++;
            if (index === 0) return size;
            index--;
        }
        else return size;
    }
}

function findLargeEnoughBlock(size, disk) {
    let freeBlockSize = 0, freeBlockIndex = -1;
    for (let i = 0; i < disk.length; i++) {
        if (disk[i] === null) {
            freeBlockSize++;
            if (freeBlockIndex === -1) freeBlockIndex = i;
            if (freeBlockSize >= size) return freeBlockIndex;
        } else {
            freeBlockSize = 0;
            freeBlockIndex = -1;
        }
    }
}

function moveFile(index, firstBlockIndex, size, disk) {
    for (let i = 0; i < size; i++) {
        [disk[index - i], disk[firstBlockIndex + i]] = [disk[firstBlockIndex + i], disk[index - i]];
    }
}

export default function([input]) {
    const disk = [];
    for (let i = 0; i < input.length; i++) {
        const digit = Number(input[i]);
        const value = i % 2 ? null : i / 2;
        for (let j = 0; j < digit; j++) {
            disk.push(value);
        }
    }
    const completed = new Set();
    while (true) {
        const { id, index } = findLargestId(disk, completed);
        if (id == null) break;
        const size = getSizeOfFile(id, index, disk);
        const firstBlockIndex = findLargeEnoughBlock(size, disk);
        if (firstBlockIndex == null || firstBlockIndex > index) completed.add(id);
        else {
            moveFile(index, firstBlockIndex, size, disk);
            completed.add(id);
        }
    }
    return disk.map((id, i) => Number(id) * i || 0).reduce(sum);
}
// blog.js - TaskMaster Pro Blog Posting
class BlogManager {
    constructor() {
        this.posts = this.loadPosts();
        this.editingId = null;
        this.init();
    }

    init() {
        document.getElementById('blogForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.editingId ? this.updatePost() : this.addPost();
        });
        document.getElementById('searchInput').addEventListener('input', () => this.renderPosts());
        this.renderPosts();
        this.setupModalEvents();
    }

    addPost() {
        const title = document.getElementById('blogTitle').value.trim();
        const content = document.getElementById('blogContent').value.trim();
        const tags = document.getElementById('blogTags').value.trim().split(',').map(t => t.trim()).filter(Boolean);
        if (!title || !content) return this.showAlert('Title and content required!', 'warning');
        const post = {
            id: Date.now(),
            title,
            content,
            tags,
            createdAt: new Date().toISOString(),
            updatedAt: null
        };
        this.posts.unshift(post);
        this.savePosts();
        this.renderPosts();
        document.getElementById('blogForm').reset();
        this.showAlert('Blog post published!', 'success');
    }

    renderPosts() {
        const list = document.getElementById('blogList');
        const search = document.getElementById('searchInput').value.trim().toLowerCase();
        let posts = this.posts;
        if (search) {
            posts = posts.filter(p => p.title.toLowerCase().includes(search) || (p.tags && p.tags.join(',').toLowerCase().includes(search)));
        }
        if (posts.length === 0) {
            list.innerHTML = `<div class='text-center text-muted py-4'>No blog posts found.</div>`;
            return;
        }
        list.innerHTML = posts.map(post => this.getPostHTML(post)).join('');
        // Add click events
        posts.forEach(post => {
            document.getElementById('post-' + post.id).onclick = () => this.openModal(post.id);
        });
    }

    getPostHTML(post) {
        return `<div class="blog-post" id="post-${post.id}">
            <div class="blog-title">${this.escapeHtml(post.title)}</div>
            <div class="blog-tags mb-1">${post.tags.map(t => `<span class='badge bg-secondary me-1'>${this.escapeHtml(t)}</span>`).join('')}</div>
            <div class="blog-content-preview">${this.escapeHtml(post.content.substring(0, 100))}${post.content.length > 100 ? '...' : ''}</div>
            <div class="text-muted small mt-1"><i class="fas fa-clock"></i> ${this.formatDate(post.createdAt)}</div>
        </div>`;
    }

    openModal(id) {
        const post = this.posts.find(p => p.id === id);
        if (!post) return;
        document.getElementById('modalTitle').textContent = post.title;
        document.getElementById('modalTags').innerHTML = post.tags.map(t => `<span class='badge bg-secondary me-1'>${this.escapeHtml(t)}</span>`).join('');
        document.getElementById('modalContent').textContent = post.content;
        document.getElementById('editPostBtn').onclick = () => this.startEdit(post.id);
        document.getElementById('deletePostBtn').onclick = () => this.deletePost(post.id);
        new bootstrap.Modal(document.getElementById('blogModal')).show();
    }

    startEdit(id) {
        const post = this.posts.find(p => p.id === id);
        if (!post) return;
        document.getElementById('blogTitle').value = post.title;
        document.getElementById('blogContent').value = post.content;
        document.getElementById('blogTags').value = post.tags.join(', ');
        this.editingId = id;
        bootstrap.Modal.getInstance(document.getElementById('blogModal')).hide();
    }

    updatePost() {
        const post = this.posts.find(p => p.id === this.editingId);
        if (!post) return;
        post.title = document.getElementById('blogTitle').value.trim();
        post.content = document.getElementById('blogContent').value.trim();
        post.tags = document.getElementById('blogTags').value.trim().split(',').map(t => t.trim()).filter(Boolean);
        post.updatedAt = new Date().toISOString();
        this.savePosts();
        this.renderPosts();
        document.getElementById('blogForm').reset();
        this.editingId = null;
        this.showAlert('Blog post updated!', 'success');
    }

    deletePost(id) {
        if (!confirm('Delete this post?')) return;
        this.posts = this.posts.filter(p => p.id !== id);
        this.savePosts();
        this.renderPosts();
        bootstrap.Modal.getInstance(document.getElementById('blogModal')).hide();
        this.showAlert('Blog post deleted!', 'success');
    }

    setupModalEvents() {
        document.getElementById('blogModal').addEventListener('hidden.bs.modal', () => {
            document.getElementById('modalTitle').textContent = '';
            document.getElementById('modalTags').innerHTML = '';
            document.getElementById('modalContent').textContent = '';
        });
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    showAlert(message, type = 'info') {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type} position-fixed`;
        alertDiv.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 250px;';
        alertDiv.innerHTML = `${message}`;
        document.body.appendChild(alertDiv);
        setTimeout(() => { if (alertDiv.parentNode) alertDiv.remove(); }, 2000);
    }

    loadPosts() {
        try {
            const stored = localStorage.getItem('blogPosts');
            return stored ? JSON.parse(stored) : [];
        } catch {
            return [];
        }
    }

    savePosts() {
        localStorage.setItem('blogPosts', JSON.stringify(this.posts));
    }
}
window.blogManager = new BlogManager();

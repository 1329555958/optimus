package com.netfinworks.optimus.service.entity;


/**
 * 
 * <p>注释</p>
 */
public class QueryPagingResult {
   
    /** 
     * 总条数
     */
    private int itemCount;
    
    /**
     * 总页数
     */
    private int pageCount;
    
    /**
     * 页大小
     */
    private int pageSize;
    
    /**
     * 当前页
     */
    private int pageIndex;

    public int getItemCount() {
        return itemCount;
    }

    public void setItemCount(int itemCount) {
        this.itemCount = itemCount;
    }

    public int getPageCount() {
        return pageCount;
    }

    public void setPageCount(int pageCount) {
        this.pageCount = pageCount;
    }

    public int getPageSize() {
        return pageSize;
    }

    public void setPageSize(int pageSize) {
        this.pageSize = pageSize;
    }

    public int getPageIndex() {
        return pageIndex;
    }

    public void setPageIndex(int pageIndex) {
        this.pageIndex = pageIndex;
    }
    
    
}

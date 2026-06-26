import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";

export default function AddProductModal({ open, onClose, onSave }) {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [tags, setTags] = useState("");
  const [description, setDescription] = useState("");
  const [imageLoadError, setImageLoadError] = useState(false);

  useEffect(() => {
    if (open) {
      setProductName("");
      setPrice("");
      setImageUrl("");
      setTags("");
      setDescription("");
      setImageLoadError(false);
    }
  }, [open]);

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  if (!open) return null;

  const imageUrlError = imageUrl.length > 0 && !isValidUrl(imageUrl);

  return (
    <>
      <div className="modal-overlay" onClick={onClose} />

      <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" type="button" onClick={onClose}>
          ×
        </button>

        <div className="modal-content">
          <h2>Add Product</h2>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "18px",
              marginTop: "20px",
            }}
          >
            <TextField
              label="Product Name"
              variant="outlined"
              fullWidth
              required
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />

            <TextField
              label="Price"
              variant="outlined"
              type="number"
              fullWidth
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />

            <TextField
              label="Image URL"
              variant="outlined"
              fullWidth
              required
              value={imageUrl}
              onChange={(e) => {
                setImageUrl(e.target.value);
                setImageLoadError(false);
              }}
              error={imageUrlError}
              helperText={
                imageUrlError
                  ? "Enter a valid image URL"
                  : "Paste image address (Right Click → Copy Image Address)"
              }
            />

            {imageUrl && !imageUrlError && (
              <div>
                <img
                  src={imageUrl}
                  alt="Preview"
                  onLoad={() => setImageLoadError(false)}
                  onError={() => setImageLoadError(true)}
                  style={{
                    width: "100%",
                    maxHeight: "250px",
                    objectFit: "contain",
                    border: "1px solid #ddd",
                    borderRadius: "12px",
                    padding: "10px",
                    background: "#fff",
                  }}
                />

                {imageLoadError && (
                  <p
                    style={{
                      color: "red",
                      marginTop: "8px",
                      fontSize: "14px",
                    }}
                  >
                    ⚠ Unable to load image preview. Check the URL.
                  </p>
                )}
              </div>
            )}

            <TextField
              label="Tags"
              variant="outlined"
              fullWidth
              required
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              helperText="Example: electronics, tablet, featured"
            />

            <TextField
              label="Description"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              helperText="Optional"
            />
          </div>

          <div
            style={{
              display: "flex",
              gap: "12px",
              marginTop: "24px",
            }}
          >
            <button
              className="btn btn-primary"
              type="button"
              onClick={() => {
                if (!productName || !price || !imageUrl) {
                  alert("Please fill all required fields");
                  return;
                }

                onSave({
                  name: productName,
                  price: Number(price),
                  image: imageUrl,
                  tags: tags
                    .split(",")
                    .map((tag) => tag.trim())
                    .filter(Boolean),
                  description,
                });
              }}
            >
              Save Product
            </button>

            <button className="btn btn-ghost" type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

from flask import Flask,request
from flask_restful import Resource,Api
from flask_cors import CORS
import os
app=Flask(__name__)
CORS(app)
api=Api(app)
path=os.getcwd()+'\\images'



class Hello(Resource):

    
    def post(self):
        import os 
        import cv2 
        import numpy as np 
        import tensorflow as tf 
        import math
        tf.gfile = tf.io.gfile
        import sys
        #################################################################################
        gpu_options = tf.compat.v1.GPUOptions(per_process_gpu_memory_fraction=0.98)
        sess = tf.compat.v1.Session(config=tf.compat.v1.ConfigProto(gpu_options=gpu_options))

        #conf = tf.ConfigProto()
        #conf.gpu_options.allow_growth=True

        #session = tf.Session(config=conf)
        ########################################################################################3
        # This is needed since the notebook is stored in the object_detection folder. 
        sys.path.append("..") 
        
        # Import utilites 
        from object_detection.utils import label_map_util 
        from object_detection.utils import visualization_utils as vis_util

        
        # Name of the directory containing the object detection module we're using 
        #MODEL_NAME = 'ssd_mobilenet_v1_coco_11_06_2017' # The path to the directory where frozen_inference_graph is stored. 
        #IMAGE_NAME = 'amb1.jpg'  # The path to the image in which the object has to be detected. !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        
        # Grab path to current working directory 
        CWD_PATH = os.getcwd() 
        
        # Path to frozen detection graph .pb file, which contains the model that is used 
        # for object detection. 
        PATH_TO_CKPT = 'frozen_inference_graph.pb'
        #PATH_TO_CKPT = 'frozen_inference_graph.pb'
        
        # Path to label map file 
        PATH_TO_LABELS = 'annotations/label_map.pbtxt'
        
        # Path to image 
        f=request.files['doc']
        f.save(path+'\\'+f.filename)
        PATH_TO_IMAGE ='images/'+f.filename#!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        # Number of classes the object detector can identify 
        NUM_CLASSES = 1
        
        # Load the label map. 
        # Label maps map indices to category names, so that when our convolution 
        # network predicts `5`, we know that this corresponds to `king`. 
        # Here we use internal utility functions, but anything that returns a 
        # dictionary mapping integers to appropriate string labels would be fine 
        label_map = label_map_util.load_labelmap(PATH_TO_LABELS) 
        categories = label_map_util.convert_label_map_to_categories( 
                label_map, max_num_classes = NUM_CLASSES, use_display_name = True) 
        category_index = label_map_util.create_category_index(categories) 
        
        # Load the Tensorflow model into memory. 
        detection_graph = tf.Graph() 
        with detection_graph.as_default(): 
            od_graph_def = tf.compat.v1.GraphDef() 
            with tf.gfile.GFile(PATH_TO_CKPT, 'rb') as fid: 
                serialized_graph = fid.read() 
                od_graph_def.ParseFromString(serialized_graph) 
                tf.import_graph_def(od_graph_def, name ='') 
        
            sess = tf.compat.v1.Session(graph = detection_graph) 
        
        # Define input and output tensors (i.e. data) for the object detection classifier 
        
        # Input tensor is the image 
        image_tensor = detection_graph.get_tensor_by_name('image_tensor:0') 
        
        # Output tensors are the detection boxes, scores, and classes 
        # Each box represents a part of the image where a particular object was detected 
        detection_boxes = detection_graph.get_tensor_by_name('detection_boxes:0') 
        
        # Each score represents level of confidence for each of the objects. 
        # The score is shown on the result image, together with the class label. 
        detection_scores = detection_graph.get_tensor_by_name('detection_scores:0') 
        detection_classes = detection_graph.get_tensor_by_name('detection_classes:0') 
        
        # Number of objects detected 
        num_detections = detection_graph.get_tensor_by_name('num_detections:0') 
        
        # Load image using OpenCV and 
        # expand image dimensions to have shape: [1, None, None, 3] 
        # i.e. a single-column array, where each item in the column has the pixel RGB value
        #########################################################################################################


        #########################################################################################################
        image = cv2.imread(PATH_TO_IMAGE)
        image_expanded = np.expand_dims(image, axis = 0) 
        
        # Perform the actual detection by running the model with the image as input 
        (boxes, scores, classes, num) = sess.run( 
            [detection_boxes, detection_scores, detection_classes, num_detections], 
            feed_dict ={image_tensor: image_expanded}) 
        

        print(f'scores is {math.floor((np.squeeze(scores)[0]*100))}')
        return {'score':math.floor((np.squeeze(scores)[0]*100))}

        

api.add_resource(Hello,'/')


if __name__=='__main__':
    app.run(debug=True)
